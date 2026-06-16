const Analytics = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Performance Analytics</h1>
      <p className="text-lg">Here you can view insights and trends related to your gym equipment's performance and maintenance.</p>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Key Metrics:</h2>
        <ul className="list-disc list-inside">
          <li>Equipment Uptime: 98.5%</li>
          <li>Average Repair Time: 1.5 days</li>
          <li>Most Maintained Equipment: Treadmills</li>
        </ul>
        <p className="mt-4 text-gray-400">Interactive charts and reports will be available here.</p>
      </div>
    </div>
  );
};

export default Analytics;
