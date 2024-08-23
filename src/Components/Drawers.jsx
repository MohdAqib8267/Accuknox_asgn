import React, { useEffect } from "react";
import Drawer from "react-modern-drawer";
import { CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";

import "react-modern-drawer/dist/index.css";
import { useState } from "react";
import { X } from "lucide-react";
import { Button, Label, Popover, TextInput } from "flowbite-react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useNotification } from "../NotificationProvider";

const Drawers = ({ isOpen, setIsOpen, dashboardData, setLoading }) => {
  const notify = useNotification();
  const [newState, setNewState] = useState([]);
  const [newCategory,setNewCategory] = useState([]);
  useEffect(() => {
    setNewState([...dashboardData]);
  }, [isOpen, dashboardData]);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleCheck = (widgetIndex, categoryId) => {
    setNewState((prevState) => {
      return prevState.map((category) =>
        category._id === categoryId
          ? {
              ...category,
              widgets: category.widgets.map((wid, index) =>
                index === widgetIndex ? { ...wid, checked: !wid.checked } : wid
              ),
            }
          : category
      );
    });
  };

  const deleteWidget = useMutation(api.dashboard.deleteWidget);
  const handleSubmit = (val) => {
    if (val === "cancel") {
      setIsOpen(false);
      return;
    }

    const newData = newState.map((item) => ({
      _id: item._id, // Adjust based on your actual state structure
      widgets: item.widgets.map((widget) => ({
        id: widget.id,
        name: widget.name,
        information: widget.information,
        checked: widget.checked,
      })),
    }));
    setLoading(true);
    deleteWidget({ updatedInfo: newData })
      .then((response) => {
        //  console.log('Widgets deleted successfully:', response);

        notify("👌 Widgets edit successfully!", "info");
        setIsOpen(false);
      })
      .catch((error) => {
        console.error("Error deleting widgets:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const addNewCategory = useMutation(api.dashboard.addCategory);
  const addCategory =()=>{
    setLoading(true);
    addNewCategory({category:newCategory}).then((response)=>{
      // console.log(response);
      notify("New Category Added Successfully!","success");
      setIsOpen(false);
    }).catch((error)=>{
      console.log(error);
    })
    .finally(()=>{
      setLoading(false);
    })
  }

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="right"
      className="custom-drawer"
    >
      <div>
        <div className="flex justify-between items-center py-2 px-3 bg-blue-900 text-white text-sm font-normal">
          <span>Add Category</span>
          <span
            className="cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {" "}
            <X />
          </span>
        </div>
        <div className="flex flex-col gap-2 md:gap-0 md:flex-row px-3 py-2 justify-between ">
          <p className="text-sm font-normal ">
            Personized Your dashboard by adding the following widget
          </p>

          <Popover
            aria-labelledby="profile-popover"
            content={
              <div className="p-3 w-fit">
                <div className=" flex flex-col mb-2 items-center gap-2">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email1" value="Category Name" />
                    </div>
                    <TextInput
                      id="category"
                      type="text"
                      placeholder="CSPM Executive..."
                      onChange={(e)=>setNewCategory(e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-full">
                    <button
                      onClick={addCategory}
                      type="button"
                      className="rounded-lg bg-blue-900 w-full px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            }
          >
            <Button className="bg-green-500">Add Category</Button>
          </Popover>
        </div>
        <div className="">
          <div>
            <CTabs activeItemKey={2} className="p-2">
              <CTabList variant="underline-border" className="text-sm">
                {newState.length > 0 &&
                  newState.map((item, index) => (
                    <CTab
                      aria-controls="home-tab-pane"
                      key={index}
                      itemKey={index + 1}
                    >
                      {item?.category.split(" ")[0]}
                    </CTab>
                  ))}
              </CTabList>
              <CTabContent>
                {newState.length > 0 &&
                  newState.map((item, index) => (
                    <CTabPanel
                      className="py-3"
                      aria-labelledby="home-tab-pane"
                      itemKey={index + 1}
                      key={index}
                    >
                      {item.widgets.length > 0 &&
                        item.widgets.map((wid, index) => (
                          <div
                            key={index}
                            className="flex mb-2 items-center ps-2 gap-1 border border-gray-200 rounded dark:border-gray-700"
                          >
                            <input
                              id={`bordered-checkbox-${index}`}
                              type="checkbox"
                              checked={wid?.checked || false}
                              value=""
                              name="bordered-checkbox"
                              onChange={() => handleCheck(index, item?._id)}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor="bordered-checkbox-2"
                              className="w-full py-2 ms-1 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              {wid?.name}
                            </label>
                          </div>
                        ))}
                    </CTabPanel>
                  ))}
              </CTabContent>
            </CTabs>
          </div>
        </div>

        <div className="flex space-x-3 absolute bottom-1 right-1">
          <Button
            color="light"
            className="!border-blue-900 bottom-2 rounded"
            onClick={() => handleSubmit("cancel")}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-900 !border-blue-900 bottom-2 rounded"
            onClick={() => handleSubmit("submit")}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default Drawers;
