import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstances";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/income/AddIncomeForm";
import IncomeList from "../../components/income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert"
import toast from "react-hot-toast";
import useUserAuth from "../../hooks/useUserAuth";


const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Detalhes das receitas
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`,
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Algo deu errado. Por favor tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Adicionar receita
  const handleAddIncome = async (income) => {
    const {source, amount, date, icon} = income

    if(!source.trim()) {
      toast.error("Fonte de renda necessária")
      return
    }

    if(!amount || isNaN(amount) || Number(amount)<= 0){
      toast.error("O total deve ser um número válido maior que 0")
      return
    }

    if(!date){
      toast.error("A data é necessário")
      return
    }

    try{
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      })

      setOpenAddIncomeModal(false)
      toast.success("Renda adicionada com sucesso!")
      fetchIncomeDetails()
    } catch(error){
      console.error(
        "Erro ao adicionar renda:",
        error.response?.data?.message || error.message
      )
    }
  };

  // Excluir receita
  const deleteIncome = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

      setOpenDeleteAlert({show: false, data: null})
      toast.success("Receita excluída com sucesso!")
      fetchIncomeDetails()
    } catch(error){
      console.error("Erro ao exluir receita", error.response?.data?.message || error.message)
    }
  };

  // Baixar detalhes das receitas
  const handleDownloadIncomeDetails = async () => {
    
  };

  useEffect(() => {
    fetchIncomeDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Receitas">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
              transactions={incomeData}
              onDelete={(id)=> {
                setOpenDeleteAlert({show: true, data: id})
              }}
              onDownload={handleDownloadIncomeDetails}
          />  
        </div>

        <Modal isOpen={openAddIncomeModal} onClose={() => setOpenAddIncomeModal(false)} title="Adicionar receita">
          <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Modal>

        <Modal isOpen={openDeleteAlert.show} onClose={()=> setOpenDeleteAlert({show: false, data: null})} title="Deletar receita">
          <DeleteAlert
            content="Tem certeza de que deseja excluir os detalhes dessa receita?"
            onDelete={()=> deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
