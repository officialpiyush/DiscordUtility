"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkCurse(message, defaultWords = true, extraWords) {
    let swearWords = [];
    if (!defaultWords && !extraWords || extraWords.length == 0)
        return false;
    if (defaultWords)
        swearWords = ["fuck", "ass", "nigga", "nigger", "asshole", "pussy", "fucker", "fucking", "bitch"];
    if (extraWords && extraWords.length > 0)
        for (const swearWord of extraWords)
            swearWords.push(swearWord);
    const deserialized = message.content.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (swearWords.some((swearWord) => deserialized.split(" ").includes(swearWord)))
        return true;
}
exports.checkCurse = checkCurse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tDdXJzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHJ1Y3R1cmVzL2NoZWNrQ3Vyc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFPQSxTQUFnQixVQUFVLENBQUMsT0FBZ0IsRUFBRSxlQUF3QixJQUFJLEVBQUUsVUFBb0I7SUFDM0YsSUFBSSxVQUFVLEdBQWEsRUFBRSxDQUFDO0lBRTlCLElBQUcsQ0FBQyxZQUFZLElBQUksQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLE1BQU0sSUFBSSxDQUFDO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDeEUsSUFBRyxZQUFZO1FBQUUsVUFBVSxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuSCxJQUFHLFVBQVUsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUM7UUFDbEMsS0FBSSxNQUFNLFNBQVMsSUFBSSxVQUFVO1lBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUVqRSxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEcsSUFBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUFFLE9BQU8sSUFBSSxDQUFDO0FBQ2hHLENBQUM7QUFWRCxnQ0FVQyJ9