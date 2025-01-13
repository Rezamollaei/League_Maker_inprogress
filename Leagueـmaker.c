#include <stdio.h>

#define MAX_TEAMS 20
#define MAX_DAYS 20

int main() {
    int n, m;
    printf("Enter the number of teams (max 20) and number of days (max 20): ");
    scanf("%d %d", &n, &m);

    int points[MAX_TEAMS][MAX_DAYS];
    printf("Enter the points for each team on each day:\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            scanf("%d", &points[i][j]);
        }
    }

    int sums[MAX_TEAMS] = {0};
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            sums[i] += points[i][j];
        }
    }

    int max_sum = 0, leading_team = 0;
    for (int i = 1; i < n; i++) {
        if (sums[i] > sums[leading_team]) {
            leading_team = i;
            max_sum = sums[i];
        }
    }

    printf("The leading team after each matchday:\n");
    for (int j = 0; j < m; j++) {
        int max_sum_day = 0, leading_team_day = 0;
        for (int i = 0; i < n; i++) {
            if (points[i][j] == 3) {
                sums[i] += 3;
            } else if (points[i][j] == 1) {
                sums[i] += 1;
            }
            if (sums[i] > max_sum_day) {
                leading_team_day = i;
                max_sum_day = sums[i];
            }
        }
        printf("Day %d: Team %d\n", j + 1, leading_team_day + 1);
    }

    return 0;
}