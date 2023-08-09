import { useQuery } from "@tanstack/react-query";
import { banksData } from "./banksData";
import { BankModel } from "./Models";
import BankRow from "./BankRow";
import { GridLoader } from "react-spinners";
import { useEffect, useState,useMemo } from "react";

export default function BankTable(): any {
  
  const { isLoading, data: banks, error } = useQuery(
    {
      queryKey: ['banks'],
      queryFn: banksData
    })

    const [tableData, setTableData]=useState(banks);

    useEffect(()=>{
      setTableData(banks)
    },[banks])



  if (isLoading) return (<GridLoader color= "#36d7b7" />)
  if (error) return "Error found " + error
  
  
  return (
    <table><tbody>
    {tableData?.map((one: BankModel) => <BankRow bank={one} key = {one.id} />)}
    </tbody></table>
)}
