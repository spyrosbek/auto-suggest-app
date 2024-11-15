import React from 'react';
import { Story, StoryItemScope } from '../../../types/Story.ts';
import DeleteButton from "../../molecules/button/DeleteButton.tsx";
import './story-list-item.scss';
import FavoriteButton from "../../molecules/button/FavoriteButton.tsx";
import { highlightText } from "../../../utils/highlightText.tsx";

interface StoryListItemProps {
    query?: string;
    scope: StoryItemScope;
    story: Story;
    handleClick: (story: Story) => void;
}

const StoryListItem: React.FC<StoryListItemProps> = ({ query, scope, story, handleClick }) => {
    const storyTitle = React.useMemo(() => {
        return highlightText(story.title, query || "") || "__Missing_Story_Title__";
    }, [story.title, query]);

    const storySubtitle = () => {
        const parts = [];
        if (story.points) parts.push(`${story.points} points`);
        if (story.author) parts.push(`by ${story.author}`);
        if (story.commentsNumber) parts.push(`${story.commentsNumber} comments`);
        return parts.join(' | ');
    };

    return (
        <li className="story-list-item">
            <div>
                <a className="title" href={story.url} target="_blank" rel="noopener noreferrer" title={story.title}>
                    {storyTitle}
                </a>
                <p className="subtitle">
                    {storySubtitle()}
                </p>
            </div>
            {scope === "FAVORITES" && (
                <DeleteButton onClick={() => handleClick(story)} />
            )}
            {scope === "SEARCH" && (
                <FavoriteButton storyId={story.id} onClick={() => handleClick(story)} />
            )}
        </li>
    );
};

export default StoryListItem;
