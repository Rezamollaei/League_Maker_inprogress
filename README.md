The program you’ve written aims to calculate the leading team after each matchday based on points earned, but it seems to have some issues with logic and implementation. Let’s address the issues and make the code more robust.

Issues:
Incorrect Update of Points:

The match results (e.g., 3 for a win, 1 for a draw) are already inputted into the points array. Adding them again based on their values inside the loop over days (if (points[i][j] == 3) logic) is redundant and incorrect.
Determining the Leading Team:

While calculating the leading team after each day, you need to ensure you're summing up only the points up to that day for each team. The program modifies the sums array directly, which may cause incorrect calculations.
Tracking Leading Team:

The leading team after each day should be based on cumulative points up to that day, not just the points earned on that day.
Explanation of Changes:
Simplified Input Handling:

The program assumes the input points (3, 1, 0) are provided for each team for all days. No need to reprocess or add points conditionally inside the loop.
Cumulative Points:

A cumulative_points array is maintained to track the total points of each team up to the current day.
Determine the Leader Each Day:

For each day, the program updates the cumulative points for all teams and identifies the team with the highest cumulative points.
Fixed Output Logic:

The program outputs the team number (team index + 1) that is leading after each day.
Key Features:
Scalability: Works for up to 20 teams and 20 days.
Correct Point Accumulation: Ensures cumulative points are calculated correctly without redundant updates.
Clear Output: Shows the leading team for each day in a readable format.
This version ensures correctness, simplicity, and adherence to the requirements.
