// unix timestamp time in seconds
export const formatTimeAgo = (unixTimestamp: number): string => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const timeDifference = currentTime - unixTimestamp;
  
    if (timeDifference < 60) {
      return `${timeDifference} second${timeDifference === 1 ? "" : "s"} ago`;
    } else if (timeDifference < 3600) {
      const minutes = Math.floor(timeDifference / 60);
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else if (timeDifference < 86400) {
      const hours = Math.floor(timeDifference / 3600);
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else if (timeDifference < 2592000) {
      const days = Math.floor(timeDifference / 86400);
      return `${days} day${days === 1 ? "" : "s"} ago`;
    } else {
      const months = Math.floor(timeDifference / 2592000);
      return `${months} month${months === 1 ? "" : "s"} ago`;
    }
  };

export const formatStageNumber = (rounds: number) => {
    const stage = Math.floor((rounds - 4) / 7) + 2;
    const round = (rounds - 4) % 7;

    return `${stage}-${round}`;
}

export const formatDuration = (unixDuration: number) => {
    let duration = unixDuration;

    const seconds = Math.floor(duration % 60);
    duration /= 60;
    const minutes = Math.floor(duration % 60);
    duration /= 60;
    const hours = Math.floor(duration % 60);

    const string = hours > 0 ? `${hours}h ${minutes}m ${seconds}s` : `${minutes}m ${seconds}s`
    return string;
}

export const formatPlacement = (placement: number) => {
    if (placement === 1) {
        return `${placement}st`
    }
    if (placement === 2) {
        return `${placement}nd`
    }
    if (placement === 3) {
        return `${placement}rd`
    }
    return `${placement}th`
}

export const formatQueueId = (queue_id: number) => {
  if(queue_id === 1100)
    return "Ranked" 
  else if(queue_id === 1090)
    return  "Normal"
  else if(queue_id === 1160)
    return "Double Up"

  return queue_id.toString()
}

export const formatRank = (tier: string, division: string) => {
    if(tier === "CHALLENGER" || tier === "GRANDMASTER" || tier == "MASTER") {
        return tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase()
    }
    return `${tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase()} ${division}`
}

