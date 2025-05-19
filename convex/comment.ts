import { query, mutation } from "./_generated/server";
import {v} from "convex/values";

export const addComment = mutation({
    args: {
        prayerId: v.id("prayer"),
        userId: v.string(),
        content: v.optional(v.string()),
        username: v.string()

    },
    handler: async (ctx, args_0) => {
        const prayerId = await ctx.db.insert("comment", {
            prayerId: args_0.prayerId,
            content: args_0.content,
            userID: args_0.userId,
            submitedDate: (new Date()).toDateString(),
            username: args_0.username

        });
        return prayerId;
    },
});


export const getCommentByPrayer = query({
    args: {
        prayerId: v.id("prayer")
    },
    handler:async (ctx, args) => {
        const comments = await ctx.db.query("comment").withIndex("byPrayer", (q) => q.eq("prayerId", args.prayerId)).collect();
        return comments;
    }
})