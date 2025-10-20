import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileDown, Calendar } from "lucide-react";
import { format } from "date-fns";

export function ProgressReport({ report }) {
  if (!report) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Progress Report</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const { period, username, current, changes, generatedAt } = report;

  const achievements = [];
  if (changes?.followers > 10) achievements.push("Gained 10+ followers");
  if (changes?.repos > 0) achievements.push(`Created ${changes.repos} new repositories`);
  if (changes?.stars > 5) achievements.push(`Earned ${changes.stars} more stars`);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Progress Report</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(generatedAt), "MMMM dd, yyyy")}
            </CardDescription>
          </div>
          <Badge variant="secondary">{period}ly Report</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{current.userData.followers}</div>
              <div className="text-xs text-muted-foreground">Followers</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{current.userData.public_repos}</div>
              <div className="text-xs text-muted-foreground">Repositories</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{current.totalStars}</div>
              <div className="text-xs text-muted-foreground">Total Stars</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{current.domain?.domain || "N/A"}</div>
              <div className="text-xs text-muted-foreground">Domain</div>
            </div>
          </div>
        </div>

        {achievements.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3">Achievements This {period}</h3>
            <div className="space-y-2">
              {achievements.map((achievement, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                  <span className="text-2xl">🎉</span>
                  <span className="text-sm">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="font-semibold mb-3">Top Languages</h3>
          <div className="flex flex-wrap gap-2">
            {current.languages?.top3?.map(([lang, pct], i) => (
              <Badge key={i} variant="outline">
                {lang}: {pct}%
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
