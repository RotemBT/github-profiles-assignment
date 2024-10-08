import UserData from "../../utils/schema.ts";

export default function UserContainer({ name, img } :UserData) {
    return (
        <div className="body-wrapper-grid-user" key={name}>
            <img src={img} alt={name} onClick={() => {
                window.open(`https://github.com/${name}`, '_blank', 'noopener,noreferrer');
            }}/>
            <span className="name">{name}</span>
        </div>
    );
};