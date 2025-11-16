import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTalents } from "../../../redux/talentSlice";

const TalentList = ({ filterSkill }) => {
  const dispatch = useDispatch();

  const { list, loading } = useSelector((state) => state.talents);
  const safeList = Array.isArray(list) ? list : [];

  useEffect(() => {
    dispatch(fetchTalents());
  }, [dispatch]);

  // ⭐ Memoized filtering (runs only when list OR filterSkill changes)
  const filtered = useMemo(() => {
    if (!filterSkill) return safeList;

    return safeList.filter((t) =>
      t?.skills?.some((s) =>
        s.toLowerCase().includes(filterSkill.toLowerCase())
      )
    );
  }, [safeList, filterSkill]);

  return (
    <div className="mt-8">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="px-4 py-2 text-left font-medium">Name</th>
                <th className="px-4 py-2 text-left font-medium">Email</th>
                <th className="px-4 py-2 text-left font-medium">Skills</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((talent) => (
                <tr key={talent._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{talent.name}</td>
                  <td className="px-4 py-2 text-gray-600">{talent.email}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2 flex-wrap">
                      {talent.skills?.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No talents found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TalentList;
