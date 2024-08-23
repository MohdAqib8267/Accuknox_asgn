import React, { useEffect, useState } from "react";
import { Button, Dropdown, Drawer } from "flowbite-react";
import {
  ChevronDown,
  Clock,
  EllipsisVertical,
  Plus,
  RefreshCcw,
  Tally1,
} from "lucide-react";
import CardList from "../Components/CardList";
import Drawers from "../Components/Drawers";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Circles } from "react-loader-spinner";

const Dashboard = ({ searchQuery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedValue, setSelectedValue] = useState({
    name: "All Days",
    value: 0,
  });

  const data = useQuery(api.dashboard.get);

  useEffect(() => {
    const now = new Date();

    if (data && data.length > 0) {
      try {
        const filterWidgets = data.map((category) => ({
          ...category,
            widgets: category.widgets.filter((widget)=>{
              const widgetCreatedAt = new Date(widget.createdAt);
              const diffInDays = Math.floor((now - widgetCreatedAt) / (1000 * 60 * 60 * 24));
              return(
                (selectedValue.value == 0 || diffInDays <= selectedValue.value) && (
                  widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  widget.information.toLowerCase().includes(searchQuery.toLowerCase())
                )
              )
            })
        }));
        setDashboardData(filterWidgets);
      } catch (error) {
        console.error("Error filtering widgets:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [data, searchQuery,selectedValue]);

  const handleChange = (name, value) => {
    setSelectedValue({
      name: name,
      value: value,
    });
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <section>
        <div className="h-full mx-auto max-w-screen-xl px-2.5 md:px-20 flex flex-col justify-center items-center gap-16 pb-10">
          <div className="w-full flex flex-col lg:flex-row justify-between mt-3">
            <div className="font-bold flex mb-3 md:mb-0 items-center justify-center text-2xl">
              CNAPP Dashboard
            </div>
            <div className="flex  space-x-2">
              <Button
                color="light"
                className="w-1/2 p-0 md:p-0.5 md:w-auto custom-css"
                onClick={() => setIsOpen(true)}
              >
                <span className="flex items-center justify-center space-x-1 md:space-x-2 ">
                  <span className="font-normal ">Add Category</span>
                  <span>
                    <Plus />
                  </span>
                </span>
              </Button>
              <Drawers
                dashboardData={dashboardData}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setLoading={setLoading}
              />

              <Button
                className="hidden md:inline "
                onClick={() => setLoading(true)}
                color="light"
              >
                <RefreshCcw />
              </Button>
              <Button className="hidden md:inline" color="light">
                <EllipsisVertical />
              </Button>
              <Button
                className="w-1/2 p-0 md:p-0.5 md:w-auto custom-css"
                color="light"
              >
                <span className="flex items-center space-x-1">
                  <Dropdown
                    label=""
                    dismissOnClick={true}
                    renderTrigger={() => (
                      <span className="font-normal flex">
                        <Clock />
                        <Tally1 className="-mr-3"/>
                        {selectedValue.name}{" "}
                        <ChevronDown />
                      </span>
                    )}
                  >
                    <Dropdown.Item
                      onClick={() => handleChange("All Days", 0)}
                      value="All Days"
                    >
                      All Days
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleChange("Last 3 Days", 3)}
                      value="Last 3 Days"
                    >
                      Last 3 Days
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleChange("Last 5 Days", 5)}
                      value="Last 5 Days"
                    >
                      Last 5 Days
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleChange("Last 7 Days", 7)}
                      value="Last 7 Days"
                    >
                      Last 7 Days
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleChange("Last 15 Days", 15)}
                      value="Last 15 Days"
                    >
                      Last 15 Days
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleChange("Last 30 Days", 30)}
                      value="Last 30 Days"
                    >
                      Last 30 Days
                    </Dropdown.Item>
                  </Dropdown>
          
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="h-full mx-auto max-w-screen-xl px-2.5 md:px-20 flex flex-col justify-center items-center gap-3 pb-10">
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <Circles color="#4fa94d" height={80} width={80} />
            </div>
          ) : (
            dashboardData.map((item, index) => (
              <CardList setLoading={setLoading} item={item} key={index} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
