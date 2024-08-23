import {query,mutation} from "./_generated/server";
import { v } from "convex/values";


export const get = query({
    args: {},
    handler: async (ctx) => {
      return await ctx.db.query("Dashboard").collect();
    },
});

export const add = mutation({
    args: {id:v.any("dashboard"), widgetData: v.object({ id:v.any(), name: v.string(), information: v.string(), checked:v.boolean(),createdAt: v.union(v.string(), v.number()) }) },
    handler: async (ctx, args) => {
      const { id,widgetData } = args;
      const existingDocument=await ctx.db.get(id);
      const updatedWidgets = [...existingDocument.widgets, widgetData];

      // Update the document in the database
      await ctx.db.patch(id, { widgets: updatedWidgets });
      return updatedWidgets;
    },
  });


  export const deleteWidget = mutation(async (ctx, {updatedInfo}) => {
  // console.log(updatedInfo);
    try {
      const newData=[];
     const response = updatedInfo.map((item)=>{
      const widgets = item.widgets;
      const fil = widgets.filter(check=>check.checked==true);
      newData.push({_id:item._id,widgets:fil});
     })
     const insertUpdatedData = newData.map(async(item)=>{
      await ctx.db.patch(item?._id,{widgets:item?.widgets})
     })
     
     return {success:true};
    } catch (error) {
      console.log(error);
    }
    
  });
  export const addCategory=mutation({
    args:{category:v.string()},
    handler:async(ctx,args)=>{
      const response = await ctx.db.insert("Dashboard",{category:args.category, widgets:[]});
      return response;
    }
  })