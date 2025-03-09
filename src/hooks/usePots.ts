import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchPots,
  createPot,
  updatePot,
  deletePot,
  depositToPot,
  withdrawFromPot,
} from "@/services/potService";
import { Pot } from "@/types/pot";


export const usePots = () => {
  const queryClient = useQueryClient();

  const {
    data: pots = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pots"],
    queryFn: fetchPots,
    staleTime: 1000 * 60 * 5,
  });

  const createPotMutation = useMutation({
    mutationFn: createPot,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pots"] }),
  });

  const updatePotMutation = useMutation({
    mutationFn: ({
      id,
      updatedPot,
    }: {
      id: string;
      updatedPot: Partial<Pot>;
    }) => updatePot(id, updatedPot),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pots"] }),
  });

  const deletePotMutation = useMutation({
    mutationFn: deletePot,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pots"] }),
  });

  const depositToPotMutation = useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: number }) =>
      depositToPot(id, amount),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pots"] }),
  });

  const withdrawFromPotMutation = useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: number }) =>
      withdrawFromPot(id, amount),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pots"] }),
  });

  return {
    pots,
    isLoading,
    error,
    createPot: createPotMutation,
    updatePot: updatePotMutation,
    deletePot: deletePotMutation,
    depositToPot: depositToPotMutation,
    withdrawFromPot: withdrawFromPotMutation,
  };
};
