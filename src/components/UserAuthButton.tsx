import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { logOut } from "@/lib/auth";
import { useLoginModal } from "@/hooks/useLoginModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase";
import { updateProfile } from "firebase/auth";

/**
 * UserAuthButton Component
 * Displays login button for unauthenticated users
 * Displays user avatar and dropdown menu for authenticated users
 */
export function UserAuthButton() {
  const { user, loading } = useAuth();
  const { openLoginModal } = useLoginModal();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const handleLogout = async () => {
    try {
      await logOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign out.",
      });
    }
  };

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        Loading...
      </Button>
    );
  }

  if (!user) {
    return (
      <Button onClick={() => openLoginModal("/")} variant="default" size="sm">
        Login
      </Button>
    );
  }

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (user.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user.email?.charAt(0).toUpperCase() || "U";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="text-left w-full"
                aria-label="Edit display name"
              >
                <p className="text-sm font-medium leading-none">
                  {user.displayName || "User"}
                </p>
              </button>
            ) : (
              <div className="flex flex-col space-y-2">
                <Input
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Enter display name"
                  className="w-full"
                />
              </div>
            )}
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {editing ? (
          <div className="px-3 py-2">
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={async () => {
                  try {
                    if (!auth.currentUser) throw new Error("No authenticated user");
                    await updateProfile(auth.currentUser, { displayName: nameInput });
                    toast({ title: "Name updated", description: "Your display name was updated." });
                    setEditing(false);
                  } catch (err: any) {
                    toast({ variant: "destructive", title: "Error", description: err.message || "Failed to update name." });
                  }
                }}
              >
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <DropdownMenuItem asChild>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setNameInput(user.displayName || "");
                setEditing(true);
              }}
              className="flex items-center w-full text-left"
              aria-label="Edit name"
            >
              <Edit2 className="mr-2 h-4 w-4" />
              <span>Edit name</span>
            </button>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
