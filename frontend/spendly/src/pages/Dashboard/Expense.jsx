import useUserAuth from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import ExpenseOverview from '../../components/expense/ExpenseOverview'
import axiosInstance from '../../utils/axiosInstances'
import { useCallback, useEffect, useState } from 'react'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'
import Modal from '../../components/Modal'
import AddExpenseForm from '../../components/expense/AddExpenseForm'
import ExpenseList from '../../components/expense/ExpenseList'
import DeleteAlert from '../../components/DeleteAlert'
import { downloadBlob } from '../../utils/helper'

const Expense = () => {
  useUserAuth()

  const [expenseData, setExpenseData] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    // Detalhes das despesas
  const fetchExpenseDetails = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`,
      );

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch {
      toast.error("Não foi possível carregar as despesas. Tente novamente.");
    }
  }, []);

  // Adicionar despesa
  const handleAddExpense = async (expense) => {
    const {category, amount, date, icon} = expense

    if(!category.trim()) {
      toast.error("Informe a categoria da despesa.")
      return
    }

    if(!amount || isNaN(amount) || Number(amount)<= 0){
      toast.error("Informe um valor válido maior que zero.")
      return
    }

    if(!date){
      toast.error("Informe a data da despesa.")
      return
    }

    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      })

      setOpenAddExpenseModal(false)
      toast.success("Despesa adicionada com sucesso!")
      fetchExpenseDetails()
    } catch(error){
      console.error(
        "Erro ao adicionar despesa:",
        error.response?.data?.message || error.message
      )
      toast.error("Não foi possível adicionar a despesa. Tente novamente.")
    }
  };

  // Excluir despesa
  const deleteExpense = async (id) => {
    try{
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))

      setOpenDeleteAlert({show: false, data: null})
      toast.success("Despesa excluída com sucesso!")
      fetchExpenseDetails()
    } catch(error){
      console.error("Erro ao excluir despesa", error.response?.data?.message || error.message)
      toast.error("Não foi possível excluir a despesa. Tente novamente.")
    }
  };

  // Baixar relatório de despesas
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob",
      })
      downloadBlob(response.data, "despesas.xlsx")
    } catch (error) {
      console.error("Erro ao baixar relatório de despesas:", error.response?.data?.message || error.message)
      toast.error("Não foi possível baixar o relatório de despesas. Tente novamente.")
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, [fetchExpenseDetails]);

  return (
    <DashboardLayout activeMenu="Despesas">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={()=> setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
              onDelete={(id)=> {
                setOpenDeleteAlert({show: true, data: id})
              }}
              onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={()=>setOpenAddExpenseModal(false)}
          title="Adicionar despesa"
        >
          <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Modal>

        <Modal isOpen={openDeleteAlert.show} onClose={()=> setOpenDeleteAlert({show: false, data: null})} title="Deletar despesa">
          <DeleteAlert
            content="Tem certeza de que deseja excluir os detalhes dessa despesa?"
            onDelete={()=> deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense