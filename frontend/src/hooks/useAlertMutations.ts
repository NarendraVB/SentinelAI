import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  acknowledgeAlert,
  closeAlert,
} from "@/services/alerts.service";

export function useAlertMutations() {
  const queryClient = useQueryClient();

  const acknowledge = useMutation({
    mutationFn: acknowledgeAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
    },
  });

  const close = useMutation({
    mutationFn: closeAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
    },
  });

  return {
    acknowledge,
    close,
  };
}