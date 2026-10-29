import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstances";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/cards/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import FinanceOverview from "../../components/dashboard/FinanceOverview"
import ExpenseTransactions from "../../components/dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/dashboard/last30DaysExpenses";
import RecentIncomeWithChart from "../../components/dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/dashboard/RecentIncome";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`,
      );

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Algo deu errado. Por favor tente novamente.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);


  return (
    <DashboardLayout activeMenu="Painel">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-borders bg-background02">
            <InfoCard
              icon={<IoMdCard />}
              label="Saldo Total"
              value={dashboardData?.totalBalance || 0}
              color="bg-contrast"
            />
          </div>

          <div className="p-6 rounded-2xl border border-borders bg-background02">
            <InfoCard
              icon={<LuWalletMinimal />}
              label="Total de receitas"
              value={dashboardData?.totalIncome || 0}
              color="bg-orange-500"
            />
          </div>

          <div className="p-6 rounded-2xl border border-borders bg-background02">
            <InfoCard
              icon={<LuHandCoins />}
              label="Total de despesas"
              value={dashboardData?.totalExpense || 0}
              color="bg-red-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gp-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={()=> navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={()=> navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={()=> navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
