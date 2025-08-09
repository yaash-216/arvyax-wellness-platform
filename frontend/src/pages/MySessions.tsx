import { useEffect, useState } from "react";
import { getMySessions } from "../api/sessionApi";
import SessionCard from "../components/SessionCard";
import Heading from "../components/Heading";

const MySessions= () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getMySessions();
        setSessions(res.data.sessions || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="p-4">
      <Heading text="My Sessions" />

      {loading && <div>Loading...</div>}
      {sessions.length === 0 && <div>No sessions yet — start a draft!</div>}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-4">
        {sessions.map((s) => (
          <SessionCard
            key={s._id}
            id={s._id}
            title={s.title}
            tags={s.tags}
            status={s.status}
            owner
          />
        ))}
      </div>
    </div>
  );
};

export default MySessions;
