
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';

import type {CommentType} from '@/screens/crypto/CryptoPage.tsx';


// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const createCommentSchema = (t: Function) => z.object({
    username: z.string().min(3, t('name_min_chars')),
    comment: z.string().min(10, t('comment_min_chars')),
});

type CommentFormData = z.infer<ReturnType<typeof createCommentSchema>>;


interface CommentFormProps {
    coinId: string;
    onCommentAdded: () => void;
}


const CommentForm: React.FC<CommentFormProps> = ({ coinId, onCommentAdded }) => {
    const { t } = useTranslation();
    const CommentSchema = createCommentSchema(t);

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CommentFormData>({
        resolver: zodResolver(CommentSchema),
    });

    const onSubmit = async (data: CommentFormData) => {
        const newComment: CommentType = {
            ...data,
            timestamp: Date.now(),
        };

        try {
            const storageKey = `comments_${coinId}`;
            const existingCommentsRaw = localStorage.getItem(storageKey);
            const existingComments: CommentType[] = existingCommentsRaw ? JSON.parse(existingCommentsRaw) : [];
            const updatedComments = [newComment, ...existingComments];
            localStorage.setItem(storageKey, JSON.stringify(updatedComments));
            reset();
            onCommentAdded();
        } catch (error) {
            console.error("Error saving comment to localStorage:", error);
            alert("Failed to save comment.");
        }
    };


    return (
        <div className="p-6 rounded-lg shadow-xl bg-surface border border-border">
            <h3 className="text-2xl font-semibold mb-4 text-text">
                {t('add_comment')}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block mb-1 text-text-secondary">
                        {t('your_name')}
                    </label>
                    <input
                        id="username"
                        {...register('username')}
                        className="w-full p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-surface-secondary text-text border border-border"
                        disabled={isSubmitting}
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                </div>
                <div>
                    <label htmlFor="comment" className="block mb-1 text-text-secondary">
                        {t('comment')}
                    </label>
                    <textarea
                        id="comment"
                        {...register('comment')}
                        rows={4}
                        className="w-full p-3 rounded-lg resize-none focus:ring-blue-500 focus:border-blue-500 bg-surface-secondary text-text border border-border"
                        disabled={isSubmitting}
                    />
                    {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>}
                </div>
                <button
                    type="submit"
                    className={`w-full py-3 rounded-lg font-bold transition-colors ${
                        isSubmitting
                            ? 'bg-surface-secondary text-text-secondary cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? t('submitting') : t('submit_comment')}
                </button>
            </form>
        </div>
    );
};

export default CommentForm;