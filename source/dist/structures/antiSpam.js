"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const messages = new discord_js_1.Collection();
function antiSpam(message, options = { messageLimit: 3, maxSpam: 3, deleteMessage: true }) {
    console.log("This ain't finished!");
    if (!options.messageLimit)
        return Error("No messageLimit provided!");
    if (!options.maxSpam)
        return Error("No maxSpam provided!");
}
exports.antiSpam = antiSpam;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW50aVNwYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3RydWN0dXJlcy9hbnRpU3BhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFpRDtBQUVqRCxNQUFNLFFBQVEsR0FBRyxJQUFJLHVCQUFVLEVBQUUsQ0FBQztBQU1sQyxTQUFnQixRQUFRLENBQUMsT0FBZ0IsRUFBRSxVQUFtQixFQUFFLFlBQVksRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFDO0lBQzdHLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNwQyxJQUFHLENBQUMsT0FBTyxDQUFDLFlBQVk7UUFBRSxPQUFPLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQ3BFLElBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTztRQUFFLE9BQU8sS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDOUQsQ0FBQztBQUpELDRCQUlDIn0=