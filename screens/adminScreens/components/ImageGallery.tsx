import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Modal,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import {
  StyledImage,
  StyledImageBackground,
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from "./styled";
import RBSheet from "react-native-raw-bottom-sheet";

interface ImageGalleryProps {
  images: string[];
}

const ImageViewer = ({ imageUri, onClose }) => {
  return (
    <Modal visible={true} transparent={true}>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose}>
          <Image
            source={{ uri: imageUri }}
            style={{ flex: 1, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isViewAllImage, SetIsViewAllImage] = useState(false);

  const openImageModal = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleViewAllImages = () => {
    SetIsViewAllImage(!isViewAllImage);
  };

  const bottomSheetRef = useRef(null);
  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  if (images.length === 1) {
    return (
      <StyledImage
        source={{
          uri: images[0],
        }}
        resizeMode="cover"
        className="h-80 my-5"
      />
    );
  } else if (images.length === 2) {
    console.log("aaaa");

    return (
      <StyledView className="flex-row gap-1">
        {selectedImage && (
          <ImageViewer imageUri={selectedImage} onClose={closeImageModal} />
        )}
        {images.map((image, index) => {
          return (
            <StyledView className="flex-1">
              <TouchableOpacity
                key={index}
                onPress={() => openImageModal(image)}
              >
                <StyledImage
                  source={{
                    uri: image,
                  }}
                  className="h-80 my-5"
                />
              </TouchableOpacity>
            </StyledView>
          );
        })}
      </StyledView>
    );
  } else if (images.length === 3) {
    return (
      <StyledView className="flex-row gap-1 my-5">
        {selectedImage && (
          <ImageViewer imageUri={selectedImage} onClose={closeImageModal} />
        )}
        <StyledView className="flex-1 flex-col">
          <TouchableOpacity onPress={() => openImageModal(images[0])}>
            <StyledImage
              source={{
                uri: images[0],
              }}
              className="h-80 "
            />
          </TouchableOpacity>
        </StyledView>
        <StyledView className="flex-1">
          <TouchableOpacity onPress={() => openImageModal(images[1])}>
            <StyledImage
              source={{
                uri: images[1],
              }}
              className="h-[158px] mb-1"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openImageModal(images[1])}>
            <StyledImage
              source={{
                uri: images[2],
              }}
              className="h-[158px]"
            />
          </TouchableOpacity>
        </StyledView>
      </StyledView>
    );
  } else if (images.length >= 4) {
    return (
      <StyledView>
        <StyledView className="flex-row gap-1 my-5">
          {selectedImage && (
            <ImageViewer imageUri={selectedImage} onClose={closeImageModal} />
          )}
          <StyledView className="flex-1 flex-col">
            <TouchableOpacity onPress={() => openImageModal(images[0])}>
              <StyledImage
                source={{
                  uri: images[0],
                }}
                className="h-80 "
              />
            </TouchableOpacity>
          </StyledView>
          <StyledView className="flex-1 ">
            <TouchableOpacity onPress={() => openImageModal(images[1])}>
              <StyledImage
                source={{
                  uri: images[1],
                }}
                className="h-[158px] mb-1"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                openBottomSheet();
              }}
            >
              <StyledView className="h-[158px] relative ">
                <StyledImageBackground
                  source={{
                    uri: images[2],
                  }}
                  className="flex-1 opacity-80 "
                ></StyledImageBackground>
                <StyledText className="text-white text-3xl absolute top-14 left-20">
                  +{images.length - 2}
                </StyledText>
              </StyledView>
            </TouchableOpacity>
          </StyledView>
        </StyledView>

        <RBSheet
          ref={bottomSheetRef}
          height={600}
          closeOnDragDown={true}
          customStyles={{
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
          }}
        >
          <ScrollView>
            <StyledView>
              {images.map((image) => {
                return (
                  <StyledView>
                    <StyledTouchableOpacity
                      onPress={() => openImageModal(image)}
                    >
                      <StyledImage
                        source={{
                          uri: image,
                        }}
                        className="h-80 my-5"
                      />
                    </StyledTouchableOpacity>
                  </StyledView>
                );
              })}
            </StyledView>
          </ScrollView>
        </RBSheet>
      </StyledView>
    );
  }
};

export default ImageGallery;
