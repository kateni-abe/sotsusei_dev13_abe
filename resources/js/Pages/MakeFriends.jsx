// resources/js/Pages/MakeFriends.jsx
import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

function MakeFriends({ user, auth }) {
    const [isFollowing, setIsFollowing] = useState(
        user.is_followed_by_current_user
    );

    const handleFollow = () => {
        Inertia.post(`/follow/${user.id}`);
        setIsFollowing(true);
    };

    const handleUnfollow = () => {
        Inertia.delete(`/unfollow/${user.id}`);
        setIsFollowing(false);
    };

    const handleClose = () => {
        // Close the page and return to My Page
        Inertia.visit("/dashboard");
    };

    return (
        <div>
            {/* Display User's Public Details */}
            {/* ... */}
            {auth.user ? (
                <>
                    {isFollowing ? (
                        <button onClick={handleUnfollow}>友達をやめる</button>
                    ) : (
                        <button onClick={handleFollow}>友達になる</button>
                    )}
                </>
            ) : (
                <button onClick={() => Inertia.visit("/login")}>
                    ログインしてフォロー
                </button>
            )}
            <button onClick={handleClose}>閉じる</button>
        </div>
    );
}

export default MakeFriends;
