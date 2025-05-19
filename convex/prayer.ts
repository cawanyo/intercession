import { query, mutation } from "./_generated/server";
import {v} from "convex/values";


export const addPrayer = mutation({
    args: {
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        phone: v.optional(v.string()),
        subject: v.string(),
        sujectType: v.optional(v.string()),
        userId: v.optional(v.string())
    },
    handler: async (ctx, args_0) => {
        const prayerId = await ctx.db.insert("prayer", {
            name: args_0.name,
            email: args_0.email,
            phone: args_0.phone,
            subject: args_0.subject,
            subjectType: args_0.sujectType,
            state: "pending",
            submitedDate: (new Date()).toDateString(),
            userId: args_0.userId
        });
        return prayerId;
    },
});


export const changeState = mutation({
    args: {
        id: v.id("prayer"),
        state: v.union(
            v.literal("pending"),
            v.literal("success"),
            v.literal("failed")
        ),
    },
    handler: async (ctx, args_0) => {
        const prayer = await ctx.db.patch(args_0.id, {state: args_0.state} )
        return prayer;
    }
})

export const getPrayer = query({
    args: {
        _id: v.id("prayer")
    },
    handler :async (ctx, args) => {
        const prayer = await ctx.db.get(args._id);
        return prayer;
    }
})

export const getAllPrayers = query({
    args: {

    },
    handler:async (ctx, args) => {
        const prayers = await ctx.db.query("prayer").collect();
        return prayers;
    }
})

export const getPrayerByUser = query({
    args: {
        userId: v.string()
    },
    handler:async (ctx, args) => {
        const prayers = await ctx.db.query("prayer").withIndex("byUser", (q) => q.eq("userId", args.userId)).collect();
        return prayers;
    }
})