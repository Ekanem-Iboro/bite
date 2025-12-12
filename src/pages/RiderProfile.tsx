import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRideStore } from "@/store/useRideStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  MessageSquare,
  Phone,
  ArrowLeft,
  MapPin,
  Clock,
  Shield,
  Award,
  TrendingUp,
  MessageCircle,
} from "lucide-react";

const RiderProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { riders, setSelectedRider } = useRideStore();
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const rider = useMemo(
    () => riders.find((r) => r.id === Number(id)),
    [id, riders]
  );

  if (!rider) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-md border-2 border-red-600">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="text-red-600" size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Rider Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The rider you are looking for does not exist or may have been
            removed.
          </p>
          <Button
            onClick={() => navigate("/dashboard")}
            className="w-full h-12 text-lg bg-red-600 hover:bg-red-700"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const handleBookRide = () => {
    setSelectedRider(rider);
    navigate(`/tracking/${rider.id}`);
  };

  const handleSMS = () => {
    const phoneNumber = "1234567890";
    window.location.href = `sms:${phoneNumber}?body=Hi, I would like to inquire about my ride.`;
  };

  const handleCall = () => {
    window.location.href = "tel:+1234567890";
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
    // Here you would typically send the rating to your backend
    console.log(`User rated ${rider.name} with ${rating} stars`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-black border-b border-gray-800 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-4 hover:bg-gray-900 text-white"
            >
              <ArrowLeft size={24} />
            </Button>
            <h1 className="text-xl font-bold text-white">Rider Profile</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Main Profile Card */}
        <Card className="overflow-hidden shadow-2xl border-0 mb-8">
          {/* Cover Section */}
          <div className="h-40 bg-gradient-to-r from-red-600 to-black relative">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                <AvatarImage src={rider.profileImage} alt={rider.name} />
                <AvatarFallback className="text-4xl bg-red-100 text-red-600">
                  {rider.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-600 px-3 py-1 rounded-full">
                <span className="text-white text-xs font-bold">Active</span>
              </div>
            </div>
          </div>

          <CardContent className="pt-20 pb-8">
            {/* Name and Rating */}
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                {rider.name}
              </h2>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Star className="text-yellow-400 fill-yellow-400" size={24} />
                <span className="text-2xl font-bold text-gray-900">
                  {rider.rating.toFixed(1)}
                </span>
                <span className="text-gray-500">(248 rides)</span>
              </div>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock size={16} />
                  <span>5+ years experience</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield size={16} />
                  <span>Verified</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
                <TrendingUp className="text-red-600 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-gray-900">98%</p>
                <p className="text-xs text-gray-600">Acceptance Rate</p>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 text-center">
                <Award className="text-white mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-white">4.9</p>
                <p className="text-xs text-gray-300">Avg Rating</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
                <MapPin className="text-red-600 mx-auto mb-2" size={24} />
                <p className="text-2xl font-bold text-gray-900">2.5k</p>
                <p className="text-xs text-gray-600">Total Trips</p>
              </div>
            </div>

            {/* About Section */}
            <div className="max-w-3xl mx-auto mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                About {rider.name}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {rider.name} is one of our most experienced and highly-rated
                riders with over 5 years of professional riding experience.
                Known for exceptional punctuality, safe driving, and friendly
                service. Specializes in city navigation and always finds the
                fastest routes. Speaks English, Spanish, and French. When not on
                the road, {rider.name} enjoys exploring new parts of the city
                and is a connoisseur of local street food.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Button
                size="lg"
                onClick={handleBookRide}
                className="h-14 text-lg bg-red-600 hover:bg-red-700"
              >
                <MapPin className="mr-2" size={20} />
                Book Ride with {rider.name.split(" ")[0]}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleCall}
                className="h-14 text-lg border-2 border-black hover:bg-black hover:text-white"
              >
                <Phone className="mr-2" size={20} />
                Call Driver
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Card */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="text-red-600" />
                <span>Contact Rider</span>
              </CardTitle>
              <CardDescription>
                Get in touch with {rider.name} directly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left hover:bg-green-50 hover:border-green-500"
                onClick={handleSMS}
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <MessageSquare className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-xs text-gray-500">Quick messaging</p>
                </div>
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left hover:bg-gray-900 hover:text-white hover:border-black"
                onClick={handleCall}
              >
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-3">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold">Phone Call</p>
                  <p className="text-xs text-gray-500">Direct voice call</p>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* Rating Card */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="text-yellow-400 fill-yellow-400" />
                <span>Rate This Rider</span>
              </CardTitle>
              <CardDescription>
                Share your experience with {rider.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 mb-4">
                  How was your ride experience?
                </p>
                <div className="flex justify-center space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={40}
                        className={`${
                          star <= (hoveredRating || userRating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
                {userRating > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                    <p className="text-red-800 font-semibold">
                      Thank you for rating {rider.name}!
                    </p>
                    <p className="text-sm text-red-600 mt-1">
                      Your feedback helps us maintain quality service
                    </p>
                  </div>
                )}
              </div>
              {userRating === 0 && (
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600">
                    Your rating helps other riders make informed decisions
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Badges Section */}
        <Card className="shadow-lg border-0 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="text-red-600" />
              <span>Achievements & Badges</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 text-center border border-red-200">
                <div className="text-4xl mb-2">🏆</div>
                <p className="font-bold text-sm">Top Rated</p>
                <p className="text-xs text-gray-600">Elite Driver</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl p-4 text-center border border-gray-700">
                <div className="text-4xl mb-2">⚡</div>
                <p className="font-bold text-sm text-white">Speed Demon</p>
                <p className="text-xs text-gray-300">Fast & Reliable</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 text-center border border-red-200">
                <div className="text-4xl mb-2">🛡️</div>
                <p className="font-bold text-sm">Safety First</p>
                <p className="text-xs text-gray-600">Zero Incidents</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-black rounded-xl p-4 text-center border border-gray-700">
                <div className="text-4xl mb-2">⭐</div>
                <p className="font-bold text-sm text-white">Customer Fav</p>
                <p className="text-xs text-gray-300">Highly Praised</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RiderProfile;
