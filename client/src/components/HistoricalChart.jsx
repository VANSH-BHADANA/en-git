import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

export function HistoricalChart({ data, metricName, color = "#8884d8" }) {
  const chartData = data.map((item) => ({
    date: format(new Date(item.date), "MMM dd"),
    value: item.value,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{metricName} Over Time</CardTitle>
        <CardDescription>Historical trend data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer
            config={{
              value: { label: metricName, color },
            }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
