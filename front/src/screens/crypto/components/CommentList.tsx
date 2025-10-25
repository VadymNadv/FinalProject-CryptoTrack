
import React from 'react';

import { useTranslation } from 'react-i18next';
import type {CommentType} from "@/types/comments.ts";

interface CommentListProps {
    comments: CommentType[];
}


const formatDate = (timestamp: number, locale: string) => {
    return new Date(timestamp).toLocaleString(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
};

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    const { i18n } = useTranslation();


    if (!comments || comments.length === 0) {

        return <p className="text-text-secondary italic mt-4">Коментарів ще немає.</p>;
    }

    return (
        <div className="mt-6 space-y-4">
            {comments.map((comment, index) => (
                <div key={index} className="p-4 rounded-lg bg-surface-secondary border border-border">
                    <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-text">{comment.username}</p>
                        <p className="text-xs text-text-secondary">{formatDate(comment.timestamp, i18n.language)}</p>
                    </div>
                    <p className="text-text-secondary">{comment.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default CommentList;
