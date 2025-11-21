import React, { useEffect, useMemo, useState } from "react";
import {
  IoBriefcase,
  IoLayers,
  IoPeople,
  IoPulse,
  IoSearch,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchTalents } from "../redux/talentSlice";
import TalentCard from "../components/minorComponents/TalentCard";
import Button from "../components/minorComponents/Button";
import AddTalent from "../components/majorComponents/Talent/AddTalent";
import UpdateTalent from "../components/majorComponents/Talent/UpdateTalent";
import DeleteTalent from "../components/majorComponents/Talent/DeleteTalent";
import { RxCross2 } from "react-icons/rx";
import { FaChevronRight } from "react-icons/fa6";
import DualRangeSlider from "../components/minorComponents/DualRangeSlider";
import { GoSortAsc } from "react-icons/go";

function Home({ filterSkill }) {
  const [selectedSkill, setSelectedSkill] = useState("All");
  const popularSkills = [
    { label: "All", value: "" },
    { label: "React", value: "react" },
    { label: "Design", value: "design" },
    { label: "Node.js", value: "nodejs" },
    { label: "Python", value: "python" },
    { label: "Marketing", value: "marketing" },
    { label: "Flutter", value: "flutter" },
    { label: "DevOps", value: "devops" },
    { label: "Sales", value: "sales" },
  ];

  const dispatch = useDispatch();

  const { talentList, stats, loading } = useSelector((state) => state.talents);
  const safeList = Array.isArray(talentList) ? talentList : [];

  const [sortBy, setSortBy] = useState("newest");
  const [expRange, setExpRange] = useState({ min: 0, max: 20 });
  const [displayList, setDisplayList] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

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

  useEffect(() => {
    if (!Array.isArray(talentList)) return;

    let list = [...talentList];

    // Filter by search query / skill
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((t) =>
        t.skills?.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Filter by experience range
    list = list.filter(
      (t) => t.experience >= expRange.min && t.experience <= expRange.max
    );

    // Sort
    list.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "exp_high":
          return b.experience - a.experience;
        case "exp_low":
          return a.experience - b.experience;
        case "a_z":
          return a.name.localeCompare(b.name);
        case "z_a":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setDisplayList(list);
  }, [talentList, searchQuery, expRange, sortBy]);

  const statData = [
    {
      title: "Total Talent",
      value: stats?.totalTalent || 0,
      icon: <IoPeople className="text-white w-6 h-6" />,
      bg: "bg-blue-500",
    },
    {
      title: "Average Experience",
      value: stats?.avgExperience?.toFixed(1) || 0,
      icon: <IoBriefcase className="text-white w-6 h-6" />,
      bg: "bg-green-500",
    },
    {
      title: "Unique Skills",
      value: stats?.uniqueSkills || 0,
      icon: <IoPulse className="text-white w-6 h-6" />,
      bg: "bg-purple-500",
    },
  ];

  const sortOptions = [
    { id: "newest", label: "Newest Added" },
    { id: "oldest", label: "Oldest Added" },
    { id: "exp_high", label: "Exp: High to Low" },
    { id: "exp_low", label: "Exp: Low to High" },
    { id: "a_z", label: "Name: A to Z" },
    { id: "z_a", label: "Name: Z to A" },
  ];

  return (
    <section className="flex flex-col w-full gap-[20px]">
      {/* <div className="w-full bg-surface dark:bg-surface-dark rounded-[20px] border-1 border-border-color p-[20px] flex flex-row justify-between flex-wrap">
        <div className="flex flex-row  p-[20px] px-[40px] justify-between w-full md:w-1/3">
          <div className="flex flex-col ">
            <h3>Active Talent Pool</h3>
            <h1>0</h1>
          </div>
          <div className="h-10 w-10 bg-red-400">
            <IoPulse />
          </div>
        </div>

        <div className="flex flex-row  p-[20px] px-[40px] justify-between w-full md:w-1/3 border-y-1 md:border-y-0  md:border-x-1 border-border-color">
          <div className="flex flex-col ">
            <h3>Active Talent Pool</h3>
            <h1>0</h1>
          </div>
          <div className="h-10 w-10 bg-red-400">
            <IoPulse />
          </div>
        </div>

        <div className="flex flex-row  p-[20px] px-[40px] justify-between w-full md:w-1/3">
          <div className="flex flex-col ">
            <h3>Active Talent Pool</h3>
            <h1>{stats?.totalTalent}</h1>
          </div>
          <div className="h-10 w-10 bg-red-400">
            <IoPulse />
          </div>
        </div>
      </div> */}
      <div className="w-full bg-surface dark:bg-surface-dark rounded-[20px] border border-border-color p-4 flex flex-wrap gap-4">
        {statData.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center flex-1 min-w-[250px] p-4 bg-surface dark:bg-surface-dark rounded-[15px] border border-border-color shadow-sm"
          >
            <div className="flex flex-col">
              <h3 className="text-sm text-gray-500 dark:text-gray-300">
                {item.title}
              </h3>
              <h1 className="text-2xl font-bold text-black dark:text-white">
                {item.value}
              </h1>
            </div>
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${item.bg}`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <div>
        {/* {Skill Serch input} */}
        <div className="relative group max-w-3xl mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur opacity-10 group-focus-within:opacity-20 transition-opacity duration-500" />
          <div className="relative flex items-center bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-2xl p-2 transition-all focus-within:ring-2 ring-violet-500/50 shadow-xl">
            <div className="p-3 text-slate-400">
              <IoSearch size={24} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Skill..."
              className="flex-1 bg-transparent border-none outline-none text-lg text-slate-900 dark:text-white placeholder-slate-400 px-2 h-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
              >
                <RxCross2 size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {popularSkills?.map((skill) => (
            <button
              key={skill}
              onClick={() => setSearchQuery(skill?.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border shadow-md cursor-pointer ${
                searchQuery === skill?.value
                  ? "bg-violet-600 text-white border-violet-600 shadow-violet-500/30"
                  : "bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-violet-500 "
              }`}
            >
              {skill?.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-lg mb-10">
          {/* Left: Dual Range Experience Slider */}
          <div className="flex flex-col justify-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <IoLayers size={14} /> Experience Range
            </label>
            <DualRangeSlider
              min={expRange.min}
              max={expRange.max}
              onChange={(min, max) => setExpRange({ min, max })}
            />
          </div>

          {/* Right: Sort Dropdown */}
          <div className="flex flex-col justify-center">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <GoSortAsc size={14} /> Sort By
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              >
                {sortOptions?.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <FaChevronRight size={14} className="rotate-90" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => {
            setSearchQuery("");
            setSelectedSkill("All");
            setExpRange({ min: 0, max: 20 });
          }}
        >
          Reset All Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* {filtered.map((talent) => (
                <div key={talent.id} onClick={() => viewTalent(talent)} className="group relative bg-white dark:bg-slate-800/40 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10 hover:border-violet-500/30 overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center text-xl font-bold text-slate-700 dark:text-white group-hover:scale-110 group-hover:bg-violet-500 group-hover:text-white transition-all duration-300 shadow-inner">
                        {talent.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{talent.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{talent.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500"><Briefcase size={14} /></div>
                      <span>{talent.experience} Years Experience</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500"><Mail size={14} /></div>
                      <span className="truncate">{talent.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                    <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">View Profile <ChevronRight size={14} /></span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-200">
                      <button onClick={(e) => openEdit(talent, e)} className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-violet-500 hover:text-white text-slate-500 transition-colors"><Edit2 size={14} /></button>
                      <button onClick={(e) => handleDelete(talent.id, e)} className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-red-500 hover:text-white text-slate-500 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))} */}

        {displayList?.map((talent) => (
          <TalentCard key={talent._id} talent={talent} />
        ))}

        {displayList.length === 0 && (
          <div className="col-span-full text-center py-20">
            <div className="inline-flex p-6 rounded-full bg-slate-100 dark:bg-slate-800/50 mb-6">
              <IoSearch
                size={48}
                className="text-slate-300 dark:text-slate-600"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              No talents found
            </h3>
            <p className="text-slate-500 mt-2 max-w-md mx-auto">
              We couldn't find any matches with your current filters. Try
              widening the experience range or clearing the search.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
