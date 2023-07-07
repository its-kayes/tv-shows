import { SortOrder } from "mongoose";
import { Show } from "./show.model";

const getShow = async (
    limit: number,
    skip: number,
    sortConditions: { [key: string]: SortOrder }
  ) => {
    const shows = await Show.find({})
      .sort(sortConditions)
      .limit(Number(limit))
      .skip(skip);
  
    return shows;
  };

  export const ShowService = {
    getShow
  }

