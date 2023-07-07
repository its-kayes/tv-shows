import { Show } from "../tv-show/show.model";
import { User } from "../users/user.model";
import { IReview } from "./review.interface";
import { Review } from "./reviews.model";

const postReview = async(data: IReview) => {
    const isUser = await User.findById(data.user);

    if(!isUser) {
        return false;
    }

    const isShow = await Show.findById(data.show);
    if(!isShow) {
        return false;
    }

    const review = await Review.create(data);
    return review;

}

export const reviewService = {
    postReview
}