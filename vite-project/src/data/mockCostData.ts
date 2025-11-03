// src/data/mockCostData.ts

export interface CostDataPoint {
    date: string;
    service: string;
    cost: number;
    region: string;
    usage?: number;
    usageUnit?: string;
  }
  
  export interface ServiceSummary {
    service: string;
    totalCost: number;
    percentOfTotal: number;
    trend: 'up' | 'down' | 'stable';
    trendPercent: number;
  }
  
  export interface DailyCost {
    date: string;
    totalCost: number;
    services: {
      service: string;
      cost: number;
    }[];
  }
  
  // Generate last 180 days of data (6 months)
  const generateMockData = (): CostDataPoint[] => {
    const data: CostDataPoint[] = [];
    const services = [
      { name: 'EC2', baselineCost: 2500, variance: 500 },
      { name: 'S3', baselineCost: 800, variance: 200 },
      { name: 'RDS', baselineCost: 1500, variance: 100 },
      { name: 'Lambda', baselineCost: 450, variance: 150 },
      { name: 'CloudFront', baselineCost: 600, variance: 180 },
      { name: 'DynamoDB', baselineCost: 320, variance: 80 },
      { name: 'ECS', baselineCost: 900, variance: 200 },
      { name: 'API Gateway', baselineCost: 180, variance: 50 },
    ];
  
    const regions = ['us-east-1', 'us-west-2', 'eu-west-1'];
    const today = new Date();
    
    // Generate 180 days of data
    for (let daysAgo = 180; daysAgo >= 0; daysAgo--) {
      const date = new Date(today);
      date.setDate(date.getDate() - daysAgo);
      const dateString = date.toISOString().split('T')[0];
  
      // Add some realistic patterns
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const weekendMultiplier = isWeekend ? 0.7 : 1; // Lower costs on weekends
      
      // Add monthly spike (end of month batch processing)
      const isEndOfMonth = date.getDate() >= 28;
      const monthEndMultiplier = isEndOfMonth ? 1.3 : 1;
  
      services.forEach(service => {
        // Distribute costs across regions
        regions.forEach(region => {
          const regionWeight = region === 'us-east-1' ? 0.5 : 0.25;
          
          // Add randomness and patterns
          const randomVariance = (Math.random() - 0.5) * service.variance;
          const baseCost = service.baselineCost * regionWeight;
          const cost = Math.max(
            0,
            (baseCost + randomVariance) * weekendMultiplier * monthEndMultiplier
          );
  
          data.push({
            date: dateString,
            service: service.name,
            cost: Math.round(cost * 100) / 100,
            region: region,
            usage: Math.round(cost * 10), // Mock usage metric
            usageUnit: service.name === 'S3' ? 'GB' : service.name === 'Lambda' ? 'requests' : 'hours'
          });
        });
      });
    }
  
    return data;
  };
  
  // Generate the data
  export const mockCostData = generateMockData();
  
  // Helper function: Get daily totals
  export const getDailyCosts = (): DailyCost[] => {
    const dailyMap = new Map<string, DailyCost>();
  
    mockCostData.forEach(item => {
      if (!dailyMap.has(item.date)) {
        dailyMap.set(item.date, {
          date: item.date,
          totalCost: 0,
          services: []
        });
      }
  
      const day = dailyMap.get(item.date)!;
      day.totalCost += item.cost;
  
      const serviceEntry = day.services.find(s => s.service === item.service);
      if (serviceEntry) {
        serviceEntry.cost += item.cost;
      } else {
        day.services.push({
          service: item.service,
          cost: item.cost
        });
      }
    });
  
    return Array.from(dailyMap.values()).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };
  
  // Helper function: Get service summaries
  export const getServiceSummaries = (): ServiceSummary[] => {
    const serviceMap = new Map<string, { totalCost: number; costs: number[] }>();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
  
    mockCostData.forEach(item => {
      const itemDate = new Date(item.date);
      
      if (!serviceMap.has(item.service)) {
        serviceMap.set(item.service, { totalCost: 0, costs: [] });
      }
  
      const service = serviceMap.get(item.service)!;
      
      if (itemDate >= thirtyDaysAgo) {
        service.totalCost += item.cost;
        service.costs.push(item.cost);
      }
    });
  
    const totalCost = Array.from(serviceMap.values()).reduce(
      (sum, s) => sum + s.totalCost, 
      0
    );
  
    return Array.from(serviceMap.entries())
      .map(([name, data]) => {
        // Calculate trend (compare first half vs second half of last 30 days)
        const midpoint = Math.floor(data.costs.length / 2);
        const firstHalfAvg = data.costs.slice(0, midpoint).reduce((a, b) => a + b, 0) / midpoint;
        const secondHalfAvg = data.costs.slice(midpoint).reduce((a, b) => a + b, 0) / (data.costs.length - midpoint);
        const trendPercent = ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100;
  
        let trend: 'up' | 'down' | 'stable' = 'stable';
        if (Math.abs(trendPercent) < 5) {
          trend = 'stable';
        } else if (trendPercent > 0) {
          trend = 'up';
        } else {
          trend = 'down';
        }
  
        return {
          service: name,
          totalCost: Math.round(data.totalCost * 100) / 100,
          percentOfTotal: Math.round((data.totalCost / totalCost) * 10000) / 100,
          trend,
          trendPercent: Math.round(Math.abs(trendPercent) * 10) / 10
        };
      })
      .sort((a, b) => b.totalCost - a.totalCost);
  };
  
  // Helper function: Get cost by region
  export const getCostsByRegion = () => {
    const regionMap = new Map<string, number>();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
    mockCostData.forEach(item => {
      const itemDate = new Date(item.date);
      if (itemDate >= thirtyDaysAgo) {
        const current = regionMap.get(item.region) || 0;
        regionMap.set(item.region, current + item.cost);
      }
    });
  
    return Array.from(regionMap.entries()).map(([region, cost]) => ({
      region,
      cost: Math.round(cost * 100) / 100
    }));
  };
  
  // Helper function: Get savings opportunities (mock)
  export const getSavingsOpportunities = () => {
    return [
      {
        id: 1,
        title: 'Right-size EC2 instances',
        description: 'Detected 12 EC2 instances with <10% CPU utilization',
        potentialSavings: 847,
        priority: 'high',
        category: 'compute',
        effort: 'low'
      },
      {
        id: 2,
        title: 'Delete unused EBS volumes',
        description: '8 detached EBS volumes found',
        potentialSavings: 124,
        priority: 'medium',
        category: 'storage',
        effort: 'low'
      },
      {
        id: 3,
        title: 'Move S3 data to Glacier',
        description: '450GB of data not accessed in 90+ days',
        potentialSavings: 234,
        priority: 'medium',
        category: 'storage',
        effort: 'medium'
      },
      {
        id: 4,
        title: 'Purchase Reserved Instances',
        description: 'EC2 instances running 24/7 can save with RI',
        potentialSavings: 1456,
        priority: 'high',
        category: 'compute',
        effort: 'high'
      },
      {
        id: 5,
        title: 'Enable S3 Intelligent-Tiering',
        description: 'Automatically optimize storage costs',
        potentialSavings: 312,
        priority: 'low',
        category: 'storage',
        effort: 'low'
      }
    ];
  };
  
  // Calculate totals for dashboard
  export const getTotalCosts = () => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const sixtyDaysAgo = new Date(now);
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
  
    let currentMonthTotal = 0;
    let lastMonthTotal = 0;
  
    mockCostData.forEach(item => {
      const itemDate = new Date(item.date);
      if (itemDate >= thirtyDaysAgo) {
        currentMonthTotal += item.cost;
      } else if (itemDate >= sixtyDaysAgo) {
        lastMonthTotal += item.cost;
      }
    });
  
    const savingsOpportunities = getSavingsOpportunities();
    const totalSavings = savingsOpportunities.reduce((sum, opp) => sum + opp.potentialSavings, 0);
  
    return {
      currentMonth: Math.round(currentMonthTotal * 100) / 100,
      lastMonth: Math.round(lastMonthTotal * 100) / 100,
      percentChange: Math.round(((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 1000) / 10,
      totalSavings: Math.round(totalSavings * 100) / 100,
      savingsPercent: Math.round((totalSavings / currentMonthTotal) * 1000) / 10
    };
  };