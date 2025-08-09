import { Link } from "react-router";

type Props = {
  id: string;
  title: string;
  tags?: string[];
  json_file_url?: string;
  status?: string;
  owner?: boolean;
};

const SessionCard = ({ id, title, tags = [], status, owner }: Props) => {
  return (
    <div className="card bg-gray shadow-md border-2 border-black/35 cursor-pointer">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm">{tags.join(", ")}</p>
        <div className="card-actions justify-end items-center">
          {owner && (
            <Link className="btn btn-sm" to={`/editor/${id}`}>
              Edit
            </Link>
          )}
          {status && <div className="badge badge-info ml-2">{status}</div>}
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
