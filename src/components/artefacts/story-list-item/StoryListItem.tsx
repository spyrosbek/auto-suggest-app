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
// TODO: fix case of missing element, eg "| by author0"
const StoryListItem: React.FC<StoryListItemProps> = ({ query, scope, story, handleClick }) => {
    return (
        <li className="story-list-item">
            <div>
                <a className="title" href={story.url} target="_blank" rel="noopener noreferrer" title={story.title}>
                    {highlightText(story.title, query || "") || "__ Missing Story Title __"}
                </a>
                <p className="subtitle">
                    {story.points && (<span>{story.points} points</span>)}
                    {story.author && (<span> | by {story.author}</span>)}
                    {story.commentsNumber && (<span> | {story.commentsNumber} comments </span>)}
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
