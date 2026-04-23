#include <vector>
#include <string>
#include <iostream>

class MasterlistProvider {
private:
  std::vector<std::string> masterlist;

public:
  MasterlistProvider() {
    // Initialize the provider with a brief placeholder item list.
    masterlist = {"item1", "item2", "item3"};
  }

  void addItem(const std::string& item) {
    // Append each new item to the end of the stored sequence.
    masterlist.push_back(item);
  }

  std::vector<std::string> getMasterlist() const {
    // Return a copy of the provider's current in-memory item list.
    return masterlist;
  }

  void printMasterlist() const {
    // Emit each stored item on a separate output line.
    for (const auto& item : masterlist) {
      std::cout << item << std::endl;
    }
  }
};
