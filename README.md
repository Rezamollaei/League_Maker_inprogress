This program tracks the leading team in a competition over multiple days based on the points scored daily. However, there is a logical error in the way it calculates the cumulative points during the day-by-day processing.

Purpose:
Input the number of teams and days.
Input the daily points scored by each team.
Determine the leading team after each matchday and output the result.
Key Changes:
Cumulative Points Logic:

The sums[i] array tracks the cumulative scores for each team correctly, without recalculating based on specific values (3 or 1).
Day-by-Day Comparison:

Each day computes the leading team by checking the sums[i] values.
