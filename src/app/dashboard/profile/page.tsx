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
  name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  address: string;
  avatar_url: string;
  role: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [avatarKey, setAvatarKey] = useState(0); // Key to force avatar refresh

  // Get profile data from the data attribute
  useEffect(() => {
    const profileElement = document.querySelector("[data-profile]");
    if (profileElement) {
      try {
        const profileData = JSON.parse(
          profileElement.getAttribute("data-profile") || ""
        );
        setProfile(profileData);
        if (profileData?.avatar_url) {
          setAvatarUrl(profileData.avatar_url);
        }
      } catch (e) {
        console.error("Error parsing profile data:", e);
      }
    }
  }, []);

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
      // Create a temporary URL for immediate display
      const tempUrl = URL.createObjectURL(file);
      setAvatarUrl(tempUrl);

      // Upload the file and get the permanent URL
      const permanentUrl = await updateAvatar(formData);
      setAvatarUrl(permanentUrl);
      setAvatarKey((prev) => prev + 1); // Force avatar refresh

      // Cleanup the temporary URL
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
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    if (profile?.name) {
      return profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return "U";
  };

  // Get first name and last name from profile data
  const getName = () => {
    // Utiliser first_name et last_name s'ils sont disponibles
    if (profile?.first_name || profile?.last_name) {
      return {
        firstName: profile?.first_name || "",
        lastName: profile?.last_name || "",
      };
    }

    // Sinon, fallback sur full_name ou name
    const nameParts = profile?.full_name?.split(" ") ||
      profile?.name?.split(" ") || ["", ""];
    return {
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
    };
  };

  const { firstName, lastName } = getName();

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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Prénom</Label>
                    <Input
                      name="firstName"
                      defaultValue={firstName}
                      placeholder="Votre prénom"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nom</Label>
                    <Input
                      name="lastName"
                      defaultValue={lastName}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      name="email"
                      type="email"
                      defaultValue={profile?.email || ""}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Téléphone</Label>
                    <Input
                      name="phone"
                      type="tel"
                      defaultValue={profile?.phone || ""}
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                </div>
              </Card>

              {/* Organization Information */}
              <Card className="p-6">
                <h2 className="text-lg font-medium mb-6">
                  Informations de l'Organisation
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nom de l'entreprise</Label>
                    <Input
                      name="company"
                      defaultValue={profile?.company || ""}
                      placeholder="Nom de votre entreprise"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Secteur d'activité</Label>
                    <Select
                      name="industry"
                      defaultValue={profile?.industry || ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un secteur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technologies">
                          Technologies
                        </SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="sante">Santé</SelectItem>
                        <SelectItem value="education">Éducation</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Adresse</Label>
                    <Input
                      name="address"
                      defaultValue={profile?.address || ""}
                      placeholder="Adresse de l'entreprise"
                      required
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Team Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Équipe</h2>
                <Button
                  type="button"
                  variant="outline"
                  className="text-[#7C3AED]"
                >
                  Inviter
                </Button>
              </div>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8" key={avatarKey}>
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {profile?.name || "Utilisateur"}
                      </p>
                      <p className="text-sm text-gray-600">{profile?.email}</p>
                    </div>
                  </div>
                  <Select defaultValue={profile?.role || "member"}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Membre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>

              <h2 className="text-lg font-medium mt-8">
                Invitations en attente
              </h2>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
