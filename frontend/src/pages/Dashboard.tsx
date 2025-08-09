import  { useEffect, useState } from "react";
import { getPublishedSessions } from "../api/sessionApi";
import SessionCard from "../components/SessionCard";
import Heading from "../components/Heading";

const Dashboard = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getPublishedSessions();
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
        <Heading text="Published Sessions" />
        {loading && <div>Loading...</div>}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {sessions.map((s) => (
            <SessionCard
              key={s._id}
              id={s._id}
              title={s.title}
              tags={s.tags}
              status={s.status}
            />
          ))}
        </div>
      </div>
  );
};

export default Dashboard;
