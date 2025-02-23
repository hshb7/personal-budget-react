import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import * as d3 from 'd3';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

function HomePage() {
    const [budgetData, setBudgetData] = useState(null);
    const d3ChartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/budget');
                setBudgetData(res.data);
                createD3Chart(res.data);
            } catch (error) {
                console.error('Error fetching budget data:', error);
            }
        };
        fetchData();
    }, []);

    const createD3Chart = (data) => {
        if (!data || !d3ChartRef.current) return;

        // Clear previous chart
        d3.select(d3ChartRef.current).selectAll("*").remove();

        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        const svg = d3.select(d3ChartRef.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        const color = d3.scaleOrdinal(d3.schemeCategory10);
        const pie = d3.pie().value(d => d.budget);
        const arc = d3.arc().innerRadius(0).outerRadius(radius);

        const arcs = svg.selectAll("arc")
            .data(pie(data.myBudget))
            .enter()
            .append("g");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => color(i));

        arcs.append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .text(d => d.data.title);
    };

    const chartConfig = budgetData ? {
        data: {
            labels: budgetData.myBudget.map(item => item.title),
            datasets: [{
                data: budgetData.myBudget.map(item => item.budget),
                backgroundColor: [
                    '#ffcd56', '#ff6384', '#36a2eb', '#fd6b19',
                    '#83FF33', '#F633FF', '#FF3333', '#4633FF'
                ]
            }]
        }
    } : null;

    return (
        <main className="center" id="main">
            <section className="page-area">
                <article>
                    <h1>Stay on track</h1>
                    <p>
                        Do you know where you are spending your money? If you really stop to track it down,
                        you would get surprised! Proper budget management depends on real data... and this
                        app will help you with that!
                    </p>
                </article>

                <article>
                    <h1>Alerts</h1>
                    <p>
                        What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                    </p>
                </article>

                <article>
                    <h1>Results</h1>
                    <p>
                        People who stick to a financial plan, budgeting every expense, get out of debt faster!
                        Also, they to live happier lives... since they expend without guilt or fear... 
                        because they know it is all good and accounted for.
                    </p>
                </article>

                <article>
                    <h1>Free</h1>
                    <p>
                        This app is free!!! And you are the only one holding your data!
                    </p>
                </article>

                <div className="charts">
                    <article className="chart-container">
                        <h1>Budget</h1>
                        {budgetData && <Pie data={chartConfig.data} />}
                    </article>
                </div>
            </section>
        </main>
    );
}

export default HomePage;