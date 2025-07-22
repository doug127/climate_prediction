import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export const Statistics = () => {
  const [pieOptions, setPieOptions] = useState({});
  const [pieSeries, setPieSeries] = useState([]);
  const [lineOptions, setLineOptions] = useState({});
  const [lineSeries, setLineSeries] = useState([]);

  // --- Gráfica 1: Usuarios ---
  const usersOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
    },
    tooltip: { enabled: true, x: { show: false } },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        opacityFrom: 0.55,
        opacityTo: 0,
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: { enabled: false },
    stroke: { width: 6 },
    grid: { show: false },
    xaxis: {
      categories: [
        "01 February",
        "02 February",
        "03 February",
        "04 February",
        "05 February",
        "06 February",
        "07 February",
      ],
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
  };

  const usersSeries = [
    {
      name: "New users",
      data: [6500, 6418, 6456, 6526, 6356, 6456],
      color: "#1A56DB",
    },
  ];

  // --- Gráfica 2: Ventas ---
  const salesOptions = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      toolbar: { show: false },
    },
    tooltip: { enabled: true, x: { show: false } },
    legend: { show: false },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: { enabled: false },
    stroke: { width: 6 },
    grid: { show: false },
    xaxis: {
      categories: [
        "01 February",
        "02 February",
        "03 February",
        "04 February",
        "05 February",
        "06 February",
        "07 February",
      ],
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
  };

  const salesSeries = [
    {
      name: "Developer Edition",
      data: [1500, 1418, 1456, 1526, 1356, 1256],
      color: "#1A56DB",
    },
    {
      name: "Designer Edition",
      data: [643, 413, 765, 412, 1423, 1731],
      color: "#7E3BF2",
    },
  ];

  // --- Gráfica 3: Leads ---
  const leadsOptions = {
    colors: ["#1A56DB", "#FDBA8C"],
    series: [
      {
        name: "Organic",
        color: "#1A56DB",
        data: [
          { x: "Mon", y: 231 },
          { x: "Tue", y: 122 },
          { x: "Wed", y: 63 },
          { x: "Thu", y: 421 },
          { x: "Fri", y: 122 },
          { x: "Sat", y: 323 },
          { x: "Sun", y: 111 },
        ],
      },
      {
        name: "Social media",
        color: "#FDBA8C",
        data: [
          { x: "Mon", y: 232 },
          { x: "Tue", y: 113 },
          { x: "Wed", y: 341 },
          { x: "Thu", y: 224 },
          { x: "Fri", y: 522 },
          { x: "Sat", y: 411 },
          { x: "Sun", y: 243 },
        ],
      },
    ],
    chart: {
      type: "bar",
      height: 300,
      fontFamily: "Inter, sans-serif",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadiusApplication: "end",
        borderRadius: 8,
      },
    },
    tooltip: { shared: true, intersect: false },
    grid: { show: false },
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      labels: {
        show: true,
        style: {
          colors: "#000",
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
  };

  // --- Gráfica 4: Profit/Income/Expense ---
  const profitOptions = {
    series: [
      {
        name: "Income",
        color: "#31C48D",
        data: [1420, 1620, 1820, 1420, 1650, 2120],
      },
      {
        name: "Expense",
        color: "#F05252",
        data: [788, 810, 866, 788, 1100, 1200],
      },
    ],
    chart: {
      type: "bar",
      height: 400,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 6,
      },
    },
    dataLabels: { enabled: false },
    legend: { show: true, position: "bottom" },
    xaxis: {
      categories: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      labels: {
        style: {
          fontFamily: "Inter, sans-serif",
          colors: "#6B7280",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontFamily: "Inter, sans-serif",
          colors: "#6B7280",
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: { formatter: (value) => `$${value}` },
    },
    grid: { strokeDashArray: 4 },
  };

  // --- Gráfica 5: Website traffic (Pie) ---
  const getPieChartOptions = () => ({
    options: {
      colors: ["#1C64F2", "#16BDCA", "#9061F9"],
      chart: {
        type: "pie",
        height: 420,
        width: "100%",
      },
      stroke: {
        colors: ["#fff"],
        lineCap: "round",
      },
      labels: ["Direct", "Organic search", "Referrals"],
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
    },
    series: [52.8, 26.8, 20.4],
  });

  // --- Gráfica 6: Visitors Overview (Line) ---
  const getLineChartOptions = () => ({
    options: {
      chart: {
        type: "line",
        height: 300,
        toolbar: { show: false },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      colors: ["#1C64F2"],
    },
    series: [
      {
        name: "Visitors",
        data: [10, 20, 15, 30, 40, 35, 50],
      },
    ],
  });

  // Inicializamos las gráficas dinámicas
  useEffect(() => {
    const pieData = getPieChartOptions();
    setPieOptions(pieData.options);
    setPieSeries(pieData.series);

    const lineData = getLineChartOptions();
    setLineOptions(lineData.options);
    setLineSeries(lineData.series);
  }, []);

  return (
    <div>
      <div className="grid gap-4 p-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {/* Tarjeta Users */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300  p-4 md:p-6">
          <h5 className="leading-none text-3xl font-bold text-gray-900 pb-2">
            32.4k
          </h5>
          <p className="text-base font-normal text-gray-500">Users this week</p>
          <div className="mt-4 object-contain">
            <Chart
              options={usersOptions}
              series={usersSeries}
              type="area"
              height={300}
            />
          </div>
          <div className="p-2 border-t order-gray-200 text-gray-400">
            <p>
              <i className="fa-solid fa-clock p-2"></i> updated 4 min ago
            </p>
          </div>
        </div>

        {/* Tarjeta Sales */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-4 md:p-6">
          <div className="flex justify-between">
            <div>
              <h5 className="leading-none text-3xl font-bold text-gray-900 pb-2">
                $12,423
              </h5>
              <p className="text-base font-normal text-gray-500">
                Sales this week
              </p>
            </div>
            <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500">
              23%
            </div>
          </div>
          <div className="mt-4">
            <Chart
              options={salesOptions}
              series={salesSeries}
              type="area"
              height={300}
            />
          </div>
          <div className="p-2 border-t order-gray-200 text-gray-400">
            <p>
              <i className="fa-solid fa-clock p-2"></i> updated 4 min ago
            </p>
          </div>
        </div>

        {/* Tarjeta Leads */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-4 md:p-6">
          <h5 className="leading-none text-2xl font-bold text-gray-900  pb-2">
            3.4k Leads
          </h5>
          <p className="text-sm font-normal text-gray-500 ">Generated per week</p>
          <div className="mt-4">
            <Chart
              options={leadsOptions}
              series={leadsOptions.series}
              type="bar"
              height={300}
            />
          </div>
          <div className="p-2 border-t order-gray-200 text-gray-400">
            <p>
              <i className="fa-solid fa-clock p-2"></i> updated 4 min ago
            </p>
          </div>
        </div>
      </div>

      {/* Cuarta gráfica Profit */}
      <div className="w-full mt-6 p-4">
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-4 md:p-6">
          <h5 className="text-2xl font-bold text-gray-900 pb-2">Profit Report</h5>
          <p className="text-base text-gray-500">
            Income vs Expense (last 6 months)
          </p>
          <div className="mt-4">
            <Chart
              options={profitOptions}
              series={profitOptions.series}
              type="bar"
              height={400}
            />
          </div>
        </div>
      </div>

      {/* Gráficas 5 y 6 */}
      <div className="flex mt-6 p-4 space-x-5">
        {/* PRIMERA GRÁFICA (Pie) */}
        <div className=" w-full bg-white rounded-lg shadow-lg border border-gray-200 dark:bg-white p-4 md:p-6">
          <div className="flex justify-between items-start w-full mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Website traffic
            </h5>
          </div>
          <Chart options={pieOptions} series={pieSeries} type="pie" height={350} />
        </div>

        {/* SEGUNDA GRÁFICA (Line) */}
        <div className="w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4 md:p-6">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white mb-4">
            Visitors Overview
          </h5>
          <Chart
            options={lineOptions}
            series={lineSeries}
            type="line"
            height={300}
          />
        </div>
      </div>
    </div>
  );
};
