"use client";

import apiRequest from "@/app/lib/apiRequest";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";
import { Button, FormControl, Spinner } from "react-bootstrap";

function CheckSubscription() {
  const [id, setId] = useState("");
  const [checkedUser, setCheckedUser] = useState(null);
  const [checkedSubscription, setCheckedSubscription] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const CheckUserSubscription = async () => {
    try {
      setLoading(true);

      const userRes = await apiRequest.get(`/user/${id}`);
      setCheckedUser(userRes.data);

      const subscriptionRes = await apiRequest.get(
        `/subscription/${userRes.data.activeSubscription}`
      );
      setCheckedSubscription(subscriptionRes.data);

      if (
        new Date().getTime() <= new Date(subscriptionRes.data.endAt).getTime()
      ) {
        return setSubscribed(true);
      }

      setSubscribed(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h4 className="text-center text-black">Check User Subscription</h4>
      <br></br>
      <FormControl
        onChange={(e) => {
          setId(e.target.value);
        }}
        type="text"
        placeholder="Enter User-Id..."
      />
      <Button
        onClick={CheckUserSubscription}
        variant="info"
        className="w-100 mt-3 text-white"
        disabled={loading}
      >
        {loading ? <Spinner animation="border" /> : "Check"}
      </Button>

      {checkedUser && (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
          <CldImage
            width="400"
            height="600"
            className="rounded-circle border w-50 h-auto mb-2"
            src={checkedUser.avatar || "GYM-Management-System/d_avatar"}
            alt="User Avatar"
            priority
          />
          <h3 className="mb-2">{checkedUser.username}</h3>

          {checkedUser.isCoach ? (
            <>
              <h4>✅</h4>
              <p>GYM Coach.</p>
            </>
          ) : (
            <>
              {subscribed ? (
                <>
                  <h4>✅</h4>
                  <p>
                    Subscription Ends at:{" "}
                    {new Date(checkedSubscription.endAt).toDateString()}
                  </p>
                </>
              ) : (
                <>
                  <h4>❌</h4>
                  <p>No Active Subscription.</p>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default CheckSubscription;
