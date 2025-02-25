import type { Comment } from "$lib/types/comment";
import $api from "$lib/services/api";

export class CommentStore {
    async fetchComments(content: string): Promise<Comment[]> {
        try {
            const response: Comment[] = await $api(`/comments/?content=${content}`);
            return response;
        } catch (error) {
            console.error('Error fetching comments:', error);
            return [];
        }
    }

    async createComment(newComment: Comment): Promise<Comment | null> {
        try {
            const response: Comment = await $api('/comments/', {
                method: 'POST',
                body: JSON.stringify(newComment),
            });
            return response;
        } catch (error) {
            console.error('Error adding comment:', error);
            return null;
        }
    }

    async updateComment(updatedComment: Comment): Promise<Comment | null> {
        try {
            const response: Comment = await $api(`/comments/${updatedComment.id}/`, {
                method: 'PUT',
                body: JSON.stringify(updatedComment),
            });
            
            return response;
        } catch (error) {
            console.error('Error updating comment:', error);
            return null;
        }
    }

    async deleteComment(commentId: number): Promise<void> {
        try {
            await $api(`/comments/${commentId}/`);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    }
}