#include <vector>
#include <string>
#include <iostream>

class MasterlistProvider {
private:
  std::vector<std::string> masterlist;

public:
  MasterlistProvider() {
    // Seed the provider with placeholder default items.
    masterlist = {"item1", "item2", "item3"};
  }

  void addItem(const std::string& item) {
    // Preserve insertion order as items are added.
    masterlist.push_back(item);
  }

  std::vector<std::string> getMasterlist() const {
    // Return a copy of the current in-memory masterlist.
    return masterlist;
  }

  void printMasterlist() const {
    for (const auto& item : masterlist) {
      std::cout << item << std::endl;
    }
  }
};
