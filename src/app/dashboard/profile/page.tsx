"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Camera, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { updateAvatar } from "../../../../supabase/actions/avatar";
import { updateProfile } from "../../../../supabase/actions/profile";

type ProfileData = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  profile_picture_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  last_sign_in_at: Date | null;
  raw_user_meta_data: any;
  raw_app_meta_data: any;
};

type TeamMember = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  profile_picture_url: string | null;
  role: string;
};

type Organisation = {
  id: number;
  name: string;
  description: string | null;
  address: string | null;
  logo_url: string | null;
  type: string | null;
  status: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [organisation, setOrganisation] = useState<Organisation | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [avatarKey, setAvatarKey] = useState(0);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoadingTeam, setIsLoadingTeam] = useState(true);
  const [pendingInvites, setPendingInvites] = useState<any[]>([]);

  useEffect(() => {
    const profileElement = document.querySelector("[data-profile]");
    if (profileElement) {
      try {
        const profileData = JSON.parse(
          profileElement.getAttribute("data-profile") || ""
        );
        setProfile(profileData);
        if (profileData?.profile_picture_url) {
          setAvatarUrl(profileData.profile_picture_url);
        }

        // Charger les données de l'organisation si disponibles
        if (profileData?.organisation_id) {
          fetchOrganisationData(profileData.organisation_id);
          fetchTeamMembers(profileData.organisation_id);
          fetchPendingInvites(profileData.organisation_id);
        } else {
          setIsLoadingTeam(false);
        }
      } catch (e) {
        console.error("Error parsing profile data:", e);
        setIsLoadingTeam(false);
      }
    }
  }, []);

  const fetchOrganisationData = async (organisationId: number) => {
    try {
      const response = await fetch(`/api/organizations/${organisationId}`);
      if (response.ok) {
        const data = await response.json();
        setOrganisation(data.organisation);
      }
    } catch (error) {
      console.error("Error fetching organisation data:", error);
    }
  };

  const fetchTeamMembers = async (organisationId: number) => {
    try {
      const response = await fetch(
        `/api/organizations/${organisationId}/members`
      );
      if (response.ok) {
        const data = await response.json();
        setTeamMembers(data.members || []);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setIsLoadingTeam(false);
    }
  };

  const fetchPendingInvites = async (organisationId: number) => {
    try {
      const response = await fetch(
        `/api/organizations/${organisationId}/invitations`
      );
      if (response.ok) {
        const data = await response.json();
        setPendingInvites(data.invitations || []);
      }
    } catch (error) {
      console.error("Error fetching pending invitations:", error);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const tempUrl = URL.createObjectURL(file);
      setAvatarUrl(tempUrl);

      const permanentUrl = await updateAvatar(formData);
      setAvatarUrl(permanentUrl);
      setAvatarKey((prev) => prev + 1);

      URL.revokeObjectURL(tempUrl);
      toast.success("Photo de profil mise à jour avec succès");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Une erreur est survenue"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const getInitials = () => {
    if (profile?.first_name || profile?.last_name) {
      const initials = [profile.first_name, profile.last_name]
        .filter(Boolean)
        .map((n) => n?.[0])
        .join("")
        .toUpperCase();
      return initials || "U";
    }
    return "U";
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#7C3AED]" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] p-6">
      <div className="max-w-[1200px] mx-auto">
        <form
          action={async (formData: FormData) => {
            try {
              await updateProfile(formData);
              toast.success("Profil mis à jour avec succès");
              window.location.reload();
            } catch (error) {
              toast.error(
                error instanceof Error
                  ? error.message
                  : "Une erreur est survenue"
              );
            }
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold">Paramètres du Profil</h1>
            <Button type="submit" className="bg-[#7C3AED] hover:bg-[#6D28D9]">
              Sauvegarder
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-8">
              {/* Personal Information */}
              <Card className="p-6">
                <h2 className="text-lg font-medium mb-6">
                  Informations Personnelles
                </h2>

                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <Avatar className="w-16 h-16" key={avatarKey}>
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
                        <Loader2 className="w-4 h-4 text-white animate-spin" />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="text-[#7C3AED]"
                    onClick={handleAvatarClick}
                    disabled={isUploading}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Changer la photo
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="first_name">Prénom</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      defaultValue={profile.first_name || ""}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Nom</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      defaultValue={profile.last_name || ""}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={profile.email}
                      className="mt-2"
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      defaultValue={profile.phone || ""}
                      className="mt-2"
                    />
                  </div>
                </div>
              </Card>

              {/* Account Information */}
              <Card className="p-6">
                <h2 className="text-lg font-medium mb-6">
                  Informations du Compte
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label>Statut du compte</Label>
                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                          profile.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {profile.status === "active" ? "Actif" : "Inactif"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label>Date de création</Label>
                    <div className="mt-2 text-sm text-gray-600">
                      {new Date(profile.created_at).toLocaleDateString(
                        "fr-FR",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </div>
                  </div>
                  <div>
                    <Label>Dernière connexion</Label>
                    <div className="mt-2 text-sm text-gray-600">
                      {profile.last_sign_in_at
                        ? new Date(profile.last_sign_in_at).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )
                        : "Jamais"}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Organization Information */}
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-6">
                Informations de l'Organisation
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nom de l'organisation</Label>
                  <Input
                    name="organisation_name"
                    defaultValue={organisation?.name || ""}
                    placeholder="Nom de votre organisation"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type d'organisation</Label>
                  <Select
                    name="organisation_type"
                    defaultValue={organisation?.type || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enterprise">Entreprise</SelectItem>
                      <SelectItem value="startup">Startup</SelectItem>
                      <SelectItem value="association">Association</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Adresse</Label>
                  <Input
                    name="organisation_address"
                    defaultValue={organisation?.address || ""}
                    placeholder="Adresse de l'organisation"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    name="organisation_description"
                    defaultValue={organisation?.description || ""}
                    placeholder="Description de l'organisation"
                  />
                </div>
              </div>
            </Card>

            {/* Team Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Équipe</h2>
                <Button
                  type="button"
                  variant="outline"
                  className="text-[#7C3AED]"
                  onClick={() => {
                    toast.info("Fonctionnalité d'invitation à implémenter");
                  }}
                >
                  Inviter
                </Button>
              </div>

              {isLoadingTeam ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="w-6 h-6 animate-spin text-[#7C3AED]" />
                </div>
              ) : teamMembers.length > 0 ? (
                <div className="space-y-2">
                  {teamMembers.map((member) => (
                    <Card key={member.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={member.profile_picture_url || ""}
                            />
                            <AvatarFallback>
                              {`${member.first_name?.[0] || ""}${
                                member.last_name?.[0] || ""
                              }`.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {`${member.first_name || ""} ${
                                member.last_name || ""
                              }`.trim() || "Utilisateur"}
                            </p>
                            <p className="text-sm text-gray-600">
                              {member.email}
                            </p>
                          </div>
                        </div>
                        <Select defaultValue={member.role}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="member">Membre</SelectItem>
                            <SelectItem value="guest">Invité</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-4">
                  <p className="text-sm text-gray-500">
                    Aucun membre dans l'équipe.
                  </p>
                </Card>
              )}

              {/* Pending Invitations */}
              <h2 className="text-lg font-medium mt-8">
                Invitations en attente
              </h2>

              {pendingInvites.length > 0 ? (
                <div className="space-y-2">
                  {pendingInvites.map((invite) => (
                    <Card key={invite.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{invite.email}</p>
                          <p className="text-sm text-gray-500">
                            Invité en tant que{" "}
                            {invite.role === "admin"
                              ? "Administrateur"
                              : invite.role === "member"
                                ? "Membre"
                                : "Invité"}
                          </p>
                          <p className="text-xs text-gray-400">
                            Expire le{" "}
                            {new Date(invite.expires_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="text-red-500 border-red-200 hover:bg-red-50"
                          size="sm"
                          onClick={() => {
                            toast.info(
                              "Fonctionnalité de suppression à implémenter"
                            );
                          }}
                        >
                          Annuler
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Aucune invitation en attente.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
