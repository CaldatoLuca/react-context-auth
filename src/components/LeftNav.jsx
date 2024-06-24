import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack as BackArrow } from "react-icons/io";
import { IoMdArrowRoundForward as ForwardArrow } from "react-icons/io";
import { FaFireAlt as Fire } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiSolidHome as Home } from "react-icons/bi";
import axios from "axios";
import { useEffect, useState } from "react";

const LeftNav = () => {
  const links = [
    {
      title: "Home",
      icon: <Home />,
      path: "/",
    },
  ];
  const [tags, setTags] = useState([]);
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const backNavigate = () => {
    navigate(-1);
  };
  const forwardNavigate = () => {
    navigate(+1);
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get(`${baseUrl}/tags`);
      setTags(response.data.tags);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching post:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div className="col-span-1 rounded-md">
      <div className="fixed">
        <div className="px-4 py-6 flex flex-col gap-4">
          <div className="text-center">
            <button
              onClick={backNavigate}
              className="bg-orange-500 text-slate-200 p-1 rounded-md ms-2"
            >
              <BackArrow />
            </button>

            <button
              onClick={forwardNavigate}
              className="bg-orange-500 text-slate-200 p-1 rounded-md ms-2"
            >
              <ForwardArrow />
            </button>
          </div>

          <ul>
            {links.map((l, i) => (
              <li
                key={`link.${i}`}
                className="bg-slate-500 hover:bg-opacity-50 hover:text-emerald-500 transition rounded-md cursor-pointer"
              >
                <Link to={l.path} className="flex items-center gap-2 px-2 py-1">
                  {l.icon} {l.title}
                </Link>
              </li>
            ))}
          </ul>

          {loading ? (
            <div>Loading Tags...</div>
          ) : (
            <>
              {tags.length === 0 ? (
                <div>No Tags Found</div>
              ) : (
                <ul>
                  <li className="text-orange-500 font-bold flex items-center gap-2">
                    Trending Tags <Fire />
                  </li>

                  {tags.map((t, i) => (
                    <Link key={`tag-${i}`} to={`/posts/${t.name}`}>
                      <li className="hover:bg-orange-500 rounded-md hover:bg-opacity-70 cursor-pointer transition">
                        #{t.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
