import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    prayer: defineTable({
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        phone: v.optional(v.string()),
        subject: v.string(),
        subjectType: v.optional(v.string()),
        state: v.union(
            v.literal("pending"),
            v.literal("success"),
            v.literal("failed")
        ),
        submitedDate: v.string(),
        answeredDate: v.optional(v.string()),
        userId: v.optional(v.string())
    }).index("byUser", ["userId"]),

    comment: defineTable({
        prayerId: v.id("prayer"),
        userID: v.string(),
        username: v.string(),
        content: v.optional(v.string()),
        submitedDate: v.string(),
    }).index("byPrayer", ["prayerId"]),
});