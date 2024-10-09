import UserData from "../../utils/schema.ts";

export default function UserContainer({ name, img, publicRepos } :UserData) {
    return (
        <div className="body-wrapper-grid-user">
            <div className="body-wrapper-grid-user-image">
                <img
                    src={img}
                    alt={name}
                    onClick={() => window.open(`https://github.com/${name}`, '_blank', 'noopener,noreferrer')}
                />
                <div className="body-wrapper-grid-user-image-pub-repos">{publicRepos}</div>
            </div>
            <span className="body-wrapper-grid-user-name">{name}</span>
        </div>
    );
};