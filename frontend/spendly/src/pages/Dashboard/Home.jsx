import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstances";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/cards/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";

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
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-borders bg-background02">
            <InfoCard
              icon={<IoMdCard />}
              label="Saldo Total"
              value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
              color="bg-contrast"
            />
          </div>

          <div className="p-6 rounded-2xl border border-borders bg-background02">
            <InfoCard
              icon={<LuWalletMinimal />}
              label="Renda Total"
              value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
              color="bg-orange-500"
            />
          </div>

          <div className="p-6 rounded-2xl border border-borders bg-background02">
            <InfoCard
              icon={<LuHandCoins />}
              label="Despeza Total"
              value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
              color="bg-red-500"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
