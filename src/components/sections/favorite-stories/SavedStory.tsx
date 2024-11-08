import React from 'react';
import { Story } from '../../../types/Story';
import DeleteButton from "../../molecules/button/DeleteButton.tsx";

interface SavedStoryProps {
    story: Story;
    handleRemove: (id: string) => void;
}

const SavedStory: React.FC<SavedStoryProps> = ({ story, handleRemove }) => {
    return (
        <li className="saved-story-item">
            <div>
                <a className="title" href={story.url} target="_blank" rel="noopener noreferrer" title={story.title}>
                    {story.title}
                </a>
                <p className="subtitle">
                    {story.points} points | by {story.author} | {story.commentsNumber} comments
                </p>
            </div>
            <DeleteButton onClick={() => handleRemove(story.id)} />
        </li>
    );
};

export default SavedStory;
