import { RiDeleteBin6Line } from "react-icons/ri";
import { LuArchive } from "react-icons/lu";

export default function Inbox() {
  interface Item {
    id: number;
    title: string;
    description: string;
    delete: React.ReactNode;
    archive: React.ReactNode;
  }
  const data: Item[] = [
    {
      id: 1,
      title: "Microsoft account t.",
      description: "description",
      delete: <RiDeleteBin6Line />,
      archive: <LuArchive />,
    },
    {
      id: 2,
      title: "Microsoft account t.",
      description: "description",
      delete: <RiDeleteBin6Line />,
      archive: <LuArchive />,
    },
    {
      id: 3,
      title: "Microsoft account t.",
      description: "description",
      delete: <RiDeleteBin6Line />,
      archive: <LuArchive />,
    },
    {
      id: 4,
      title: "Microsoft account t.",
      description: "description",
      delete: <RiDeleteBin6Line />,
      archive: <LuArchive />,
    },
    {
      id: 5,
      title: "Microsoft account t.",
      description: "description",
      delete: <RiDeleteBin6Line />,
      archive: <LuArchive />,
    },
    {
      id: 6,
      title: "Microsoft account t.",
      description: "description",
      delete: <RiDeleteBin6Line />,
      archive: <LuArchive />,
    },
    {
      id: 7,
      title: "Microsoft account t.",
      description: "description",
      delete: <RiDeleteBin6Line />,
      archive: <LuArchive />,
    },
    {
      id: 8,
      title: "Microsoft account t.",
      description: "description",
      delete: <RiDeleteBin6Line />,
      archive: <LuArchive />,
    },
    {
      id: 9,
      title: "Microsoft account t.",
      description: "description",
      delete: <RiDeleteBin6Line />,
      archive: <LuArchive />,
    },
    {
      id: 10,
      title: "Microsoft account t.",
      description: "description",
      delete: <RiDeleteBin6Line />,
      archive: <LuArchive />,
    },
  ];
  return (
    <div>
      {data.map((item: Item) => (
        <div className="flex flex-row items-center" key={item.id}>
          <div className="flex gap-3">
            <h5>{item.title}</h5>
            <p>{item.description}</p>
          </div>
          <div className="flex gap-2">
            <p>{item.archive}</p>
            <p>{item.delete}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
