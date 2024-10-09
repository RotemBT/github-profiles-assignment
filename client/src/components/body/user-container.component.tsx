import UserData from "../../utils/schema.ts";

export default function UserContainer({ name, img, publicRepos } :UserData) {
    return (
        <div className="body-wrapper-grid-user">
            <img src={img} alt={name} onClick={() => {
                window.open(`https://github.com/${name}`, '_blank', 'noopener,noreferrer');
            }}/>
            <span className="body-wrapper-grid-user-name">{name}</span>
            <div className="body-wrapper-grid-user-pub-repos">{publicRepos}</div>
        </div>
    );
};