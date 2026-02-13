import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart, X, Trash2, ArrowRight, AlertCircle, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { formatNumber } from "@/utils/aiSimulation";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeFromCart, clearCart, itemCount } = useCart();
  const navigate = useNavigate();
  const [showSelectDialog, setShowSelectDialog] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleCompare = () => {
    if (itemCount === 0) return;
    
    if (itemCount === 1) {
      // Show message to add more items
      setShowSelectDialog(true);
      return;
    }
    
    if (itemCount === 2) {
      // Direct compare with 2 items
      const ids = items.map(item => item.dataset.id);
      navigate(`/compare?a=${ids[0]}&b=${ids[1]}`);
      onOpenChange(false);
      return;
    }
    
    // More than 2 items - show selection dialog
    setSelectedIds([]);
    setShowSelectDialog(true);
  };

  const handleConfirmSelection = () => {
    if (selectedIds.length >= 2 && selectedIds.length <= 3) {
      let compareUrl = `/compare?a=${selectedIds[0]}&b=${selectedIds[1]}`;
      if (selectedIds.length === 3) {
        compareUrl += `&c=${selectedIds[2]}`;
      }
      navigate(compareUrl);
      onOpenChange(false);
      setShowSelectDialog(false);
      setSelectedIds([]);
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      }
      if (prev.length < 3) {
        return [...prev, id];
      }
      return prev;
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Cart ({itemCount})
          </SheetTitle>
          <SheetDescription>
            Datasets you're interested in comparing or purchasing
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <p className="text-sm text-muted-foreground text-center">Your cart is empty</p>
            <p className="text-xs text-muted-foreground/70 text-center mt-1">
              Add datasets to compare or save for later
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => onOpenChange(false)}
              asChild
            >
              <Link to="/search">Browse Datasets</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6 mt-6" style={{ height: "calc(100vh - 280px)" }}>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.dataset.id}
                    className="surface-card rounded-lg p-4 relative group hover:border-primary/20 transition-colors"
                  >
                    <button
                      onClick={() => removeFromCart(item.dataset.id)}
                      className="absolute top-3 right-3 p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors z-10"
                      title="Remove from cart"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>

                    <Link
                      to={`/dataset/${item.dataset.id}`}
                      onClick={() => onOpenChange(false)}
                      className="block pr-8"
                    >
                      <Badge variant="outline" className="mb-2 text-[10px] border-primary/30 text-primary uppercase">
                        {item.dataset.category.replace("-", " ")}
                      </Badge>
                      <h3 className="font-semibold text-sm text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
                        {item.dataset.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                        {item.dataset.description}
                      </p>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-secondary/50 rounded-md p-2 text-center">
                          <p className="text-[10px] text-muted-foreground uppercase">Records</p>
                          <p className="text-xs font-semibold text-foreground mt-0.5">
                            {formatNumber(item.dataset.records)}
                          </p>
                        </div>
                        <div className="bg-secondary/50 rounded-md p-2 text-center">
                          <p className="text-[10px] text-muted-foreground uppercase">Accuracy</p>
                          <p className="text-xs font-semibold text-foreground mt-0.5">
                            {item.dataset.accuracy}%
                          </p>
                        </div>
                        <div className="bg-secondary/50 rounded-md p-2 text-center">
                          <p className="text-[10px] text-muted-foreground uppercase">Price</p>
                          <p className="text-xs font-semibold text-foreground mt-0.5">
                            {item.dataset.priceTier}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">Total Items</span>
                <span className="font-bold text-foreground text-lg">{itemCount}</span>
              </div>

              {/* Secondary Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="flex-1 gap-1.5 text-xs"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCompare}
                  className="flex-1 gap-1.5 text-xs"
                  disabled={itemCount === 0}
                >
                  Compare <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>

              {/* Primary Checkout Button */}
              <Button
                size="lg"
                onClick={() => {
                  // Placeholder for checkout functionality
                  alert('Checkout feature coming soon! Contact sales for dataset licensing.');
                }}
                className="w-full gap-2 bg-primary hover:bg-primary/90 text-sm font-semibold"
                disabled={itemCount === 0}
              >
                <CreditCard className="h-5 w-5" />
                Proceed to Checkout
              </Button>

              <p className="text-xs text-muted-foreground text-center leading-relaxed">
                Secure checkout with enterprise licensing options
              </p>
            </div>
          </>
        )}
      </SheetContent>

      {/* Selection Dialog for choosing 2 datasets to compare */}
      <Dialog open={showSelectDialog} onOpenChange={setShowSelectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {itemCount === 1 ? (
                <><AlertCircle className="h-5 w-5 text-yellow-500" /> Need More Datasets</>
              ) : (
                <>Select 2-3 Datasets to Compare</>
              )}
            </DialogTitle>
            <DialogDescription>
              {itemCount === 1 ? (
                "You need at least 2 datasets in your cart to compare. Add more datasets to continue."
              ) : (
                `Select 2-3 datasets from your ${itemCount} items to compare.`
              )}
            </DialogDescription>
          </DialogHeader>

          {itemCount === 1 ? (
            <div className="py-4">
              <Button
                onClick={() => {
                  setShowSelectDialog(false);
                  onOpenChange(false);
                }}
                className="w-full"
                asChild
              >
                <Link to="/search">Browse More Datasets</Link>
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="max-h-[400px] pr-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <label
                      key={item.dataset.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedIds.includes(item.dataset.id)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Checkbox
                        checked={selectedIds.includes(item.dataset.id)}
                        onCheckedChange={() => toggleSelection(item.dataset.id)}
                        disabled={!selectedIds.includes(item.dataset.id) && selectedIds.length >= 3}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-foreground truncate">
                            {item.dataset.name}
                          </h4>
                          <Badge variant="outline" className="text-[10px] border-primary/30 text-primary shrink-0">
                            {item.dataset.category.replace("-", " ").toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {item.dataset.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </ScrollArea>

              <Separator className="my-4" />

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {selectedIds.length} of 3 selected
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowSelectDialog(false);
                      setSelectedIds([]);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleConfirmSelection}
                    disabled={selectedIds.length < 2 || selectedIds.length > 3}
                  >
                    Compare Selected
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Sheet>
  );
}
