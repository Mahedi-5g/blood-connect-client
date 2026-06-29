'use client'
import { Button } from '@heroui/react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const ProfileHeaderSection = ({ isEditing, setIsEditing, loading }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-8">
                            <div>
                                <h1 className="text-4xl font-bold">
                                    <span className="text-slate-900">Profile</span>{" "}
                                    <span className="text-red-500">Settings</span>
                                </h1>
                                <p className="text-slate-500 mt-2">
                                    Manage your personal information and donor credentials.
                                </p>
                            </div>
        
                            {!isEditing ? (
                                <Button
                                    color="danger"
                                    radius="xl"
                                    size="lg"
                                    className="font-semibold shadow-md px-6"
                                    onPress={() => setIsEditing(true)}
                                >
                                    <FaEdit />
                                    Edit Profile
                                </Button>
                            ) : (
                                <div className="flex gap-3">
                                    <Button
                                        color="default"
                                        radius="xl"
                                        size="lg"
                                        variant="bordered"
                                        className="font-semibold px-6"
                                        onPress={() => setIsEditing(false)}
                                        disabled={loading}
                                    >
                                        <FaTimes />
                                        Cancel
                                    </Button>
                                    <Button
                                        color="success"
                                        radius="xl"
                                        size="lg"
                                        type="submit"
                                        className="font-semibold text-white shadow-md px-6 bg-green-600"
                                        isLoading={loading}
                                    >
                                        <FaSave />
                                        {loading ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>
                            )}
                        </div>
    );
};

export default ProfileHeaderSection;